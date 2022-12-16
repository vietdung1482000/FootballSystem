import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection, getDocs } from "firebase/firestore";
import PaypalCheckoutButton from "./PaypalButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from 'moment';
import icon_success from '../img/icon/icon-success.svg';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Loading } from "./layout/Loading";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
function FormModal(props) {
  const { dataSan, recallAPI } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [presetDate, setPresetDate] = useState(new Date());
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [type, setType] = useState("");
  const [san, setSan] = useState("");
  const [product, setProduct] = useState({});
  const [giaSan, setGiaSan] = useState();
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({});
  const [check, setCheck] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [hoanthanh, setHoanThanh] = useState(false);
  const [xacnhan, setXacnhan] = useState("");
  const [getData, setGetData] =  useState([]);
  const NgayGio = moment(presetDate).format("YYYY/MM/DD HH:mm")
  const time = moment(presetDate).format("HH:mm")
  const timeArray = time.split(':');
  const timeCheck = parseInt(timeArray[0])
  const { currentUser } = useContext(AuthContext);

  const getData12 = () => {
    const getdataDatSan = collection(db, "users");
    getDocs(getdataDatSan)
      .then((response) => {
        const datsans = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setGetData(datsans);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getData12();
  }, []);
  const dataClone =  getData.find((item) => item.id === currentUser.uid)
  const phoneUser = dataClone?.data.phone 
  useEffect(() => {
    if (open) {
      setSubmit(false);
      setName("");
      setEmail("");
      setPhone("");
      setPresetDate("");
      setAge("");
      setJob("");
      setType("");
      setSan("");
    }
  }, [open]);

  useEffect(() => {
    if (check) {
      onSubmit();
    }
  }, [check]);

  useEffect(() => {
    if (san) {
      {
        dataSan.SoLuongSan.map((item) => {
          if (san === item.SoLuongSan) {
            setGiaSan(item.Gia)
            setProduct({
              description: `đặt sân ${dataSan.nameField}`,
              price: timeCheck >= 17 ? parseInt((parseInt(item.Gia) + parseInt(dataSan.extra_price)) / 24000) : parseInt(parseInt(item.Gia) / 24000),
            })
          }
        })
      }
    }
  }, [san]);

  const onSubmit = async () => {
    setLoading(true)
    const colRef = collection(db, "datsan");
    await addDoc(colRef, data)
      .then(() => {
        setCheck(false);
        setLoading(false)
        setHoanThanh(true)
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const Checkbox = () => {
    if (type.type === 20) {
      return (
        <>
          <FormControl className="bases__margin--bottom10 w-100">
            <FormLabel>Chọn Tuổi</FormLabel>
            <RadioGroup
              defaultValue=""
              row
              onChange={(e) => setAge({ age: e.target.value })}
            >
              <FormControlLabel
                value="12"
                control={<Radio />}
                label="12 đến 17 Tuổi"
              />
              <FormControlLabel
                value="18"
                control={<Radio />}
                label="18 đến 25 Tuổi"
              />
              <FormControlLabel value="khác" control={<Radio />} label="Khác" />
            </RadioGroup>
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl className="bases__margin--bottom10 w-100">
            <FormLabel>Chọn nghề Nghiệp</FormLabel>
            <RadioGroup
              defaultValue=""
              row
              onChange={(e) => setJob({ job: e.target.value })}
            >
              <FormControlLabel
                control={<Radio value="Sinh Viên" />}
                label="Sinh Viên"
              />
              <FormControlLabel
                control={<Radio value="Nhân Viên Văn Phòng" />}
                label="Nhân Viên Văn Phòng"
              />
              <FormControlLabel value="khác" control={<Radio />} label="Khác" />
            </RadioGroup>
            <FormHelperText></FormHelperText>
          </FormControl>
        </>
      );
    }
  };

  const submitForm = () => {
    setData({
      name: currentUser.displayName,
      email: currentUser.email,
      phone: phoneUser,
      nameField: dataSan.nameField,
      phoneBusiness: dataSan.phone,
      address: dataSan.address,
      presetDate: NgayGio,
      age: age,
      job: job,
      type: type,
      createBy: currentUser.uid,
      san: san,
      xacnhan: "",
    });
    setSubmit(true);
  };

  const onChangeVl = (value) => {
    setCheck(value);
  };

  const renderBodyModal = () => {
    if (submit === false) {
      return (
        <>
          <div className="box">
            <div>
              <form>
                <FormControl className="bases__margin--bottom10 w-100">
                  <InputLabel
                    id="filled-select-currency"
                    select
                    label="Select"
                    helperText="Please select your currency"
                    variant="filled"
                  >
                    Chọn Đội
                  </InputLabel>
                  <Select onChange={(e) => setType({ type: e.target.value })}>
                    <MenuItem
                      value={10}
                      onChange={(e) => setType({ type: e.target.value })}
                    >
                      Đơn
                    </MenuItem>
                    <MenuItem
                      value={20}
                      onChange={(e) => setType({ type: e.target.value })}
                    >
                      Ghép Đội
                    </MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
                {/* 1) TextField */}
                <TextField
                  placeholder="Nhập Tên Người Đặt"
                  label="Tên Người Đặt"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={currentUser.displayName}
                />

                {/* 2) TextField */}
                <TextField
                  placeholder="Nhập Số Điện Thoại"
                  label="Số Điện Thoại"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={phoneUser}
                />

                {/* 3) TextField */}
                <TextField
                  placeholder="Nhập Địa Chỉ mail"
                  label="Địa Chỉ mail"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={currentUser.email}
                />
                <p>
                  ----------------------------------------------------------------------------------------------------
                </p>
                <h4 style={{ fontSize: "24px", marginBottom: "20px" }}>
                  Sân Bóng
                </h4>
                {/* 4) TextField */}
                <TextField
                  placeholder="Nhập Tên Sân"
                  label="Tên Sân"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={dataSan.nameField}
                />
                <FormControl className="bases__margin--bottom10 w-100">
                  <InputLabel
                    id="filled-select-currency"
                    select
                    label="Select"
                    helperText="Please select your currency"
                    variant="filled"
                  >
                    Chọn Sân
                  </InputLabel>
                  <Select onChange={(e) => setSan(e.target.value)}>
                    {dataSan.SoLuongSan?.map((item) => {
                      return <MenuItem
                        value={item.SoLuongSan}
                        onChange={(e) => setSan(e.target.value)}
                      >
                        {item.SoLuongSan}
                      </MenuItem>
                    })}
                  </Select>

                  <FormHelperText></FormHelperText>
                  {/* <select>
                    {
                      dataSan.SoLuongSan?.map((item) => {
                        return <option
                          value={item.SoLuongSan}
                          onChange={(e) => setSan(e.target.value)}
                        >
                          {item.SoLuongSan}
                        </option >
                      })}
                  </select> */}
                </FormControl>
                <TextField
                  placeholder="Nhập Số Điện Thoại"
                  label="Số Điện Thoại"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={dataSan.phone}
                />

                {/* 3) TextField */}
                <TextField
                  placeholder="Nhập Địa Chỉ"
                  label="Địa Chỉ"
                  variant="outlined"
                  className="bases__margin--bottom15 w-100"
                  value={dataSan.address}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <Stack spacing={3}>
                    <DateTimePicker
                      className="bases__margin--bottom10"
                      renderInput={(props) => <TextField {...props} />}
                      label="Ngày Đặt"
                      value={presetDate}
                      onChange={(newValue) => {
                        setPresetDate(newValue);
                      }}
                    />
                  </Stack>
                </LocalizationProvider>
                {Checkbox()}
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="bases__margin--bottom10 w-100 bases__margin--top30"
                  onClick={submitForm}
                >
                  Đặt Sân
                </Button>
              </form>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="bases__width--500">
          {hoanthanh === false ? <>
            <h4 className="bases__margin--top50">
              Thông tin thanh toán
            </h4>
            <div className="container bases__margin--bottom50">
              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  Tên Sân:
                </div>

                <div className="col bases__margin--bottom10">{dataSan.nameField}</div>
              </div>

              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  Địa chỉ:
                </div>
                <div className="col bases__margin--bottom10">{dataSan.address}</div>
              </div>

              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  Ngày đặt :
                </div>
                <div className="col bases__margin--bottom10">
                  Ngày {NgayGio}
                </div>
              </div>

              <div className="row">
                <div className="col bases__text--bold base__text--16">Giá:</div>
                <div className="col bases__margin--bottom10">{giaSan}</div>
              </div>

              {timeCheck >= 17 ? <>
                <div className="row">
                  <div className="bases__text--bold bases__text--red base__text--16"> Lưu ý:</div>
                  <div className="bases__margin--bottom10 bases__text--red">
                    Bạn đang đặt sân vào khung giờ vàng hoặc buổi tối. Điều này sẽ khiến giá tiền ban đầu bị thay đổi. Hãy kiểm tra thật kỹ trước khi thực hiện !!!
                  </div>
                </div>

                <div className="row">
                  <div className="col bases__text--bold base__text--16 bases__text--red">Giá khung giờ đặc biệt:</div>
                  <div className="col bases__margin--bottom10 bases__text--red">{parseInt(giaSan) + parseInt(dataSan.extra_price)} vnd</div>
                </div>
              </> : <></>}

              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  Người đặt:
                </div>
                <div className="col bases__margin--bottom10">{currentUser.displayName}</div>
              </div>

              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  email:
                </div>
                <div className="col bases__margin--bottom10">{currentUser.email}</div>
              </div>

              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  Số điện thoại liên hệ:
                </div>
                <div className="col bases__margin--bottom10">
                  {phone}
                </div>
              </div>
            </div>

            <div className="paypal-button-container d-flex justify-content-center">
              <PaypalCheckoutButton
                product={product}
                check={(value) => {
                  onChangeVl(value);
                }}
              />
              <button
                className="button-cancle bases__margin--left50"
                onClick={handleClose}
              >
                Hủy Thanh toán
              </button>
            </div>
          </> : <>
            <h4 className="bases__margin--top20 text-center">
              Thanh toán thành công
            </h4>
            <div className=" d-flex justify-content-center bases__margin--top10">
              <img className="bases__width--150" src={icon_success} alt="" />
            </div>

            <div className=" d-flex justify-content-center">
              <button
                className="button-cancle bases__margin--top50"
                onClick={handleClose}
              >
                Đóng
              </button>
            </div>
          </>}

        </div>
      );
    }

  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setHoanThanh(false)
    if (recallAPI) {
      recallAPI();
    }
  };

  return (
    <div>
      <Loading loader={loading} />
      <button onClick={handleClickOpen} className="pages__detail-button bases__margin--top15 bases__margin--right30"> Đặt Sân</button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Đặt Sân
        </BootstrapDialogTitle>
        <DialogContent dividers>{renderBodyModal()}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default FormModal;
