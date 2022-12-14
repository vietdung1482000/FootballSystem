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
              description: `?????t s??n ${dataSan.nameField}`,
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
            <FormLabel>Ch???n Tu???i</FormLabel>
            <RadioGroup
              defaultValue=""
              row
              onChange={(e) => setAge({ age: e.target.value })}
            >
              <FormControlLabel
                value="12"
                control={<Radio />}
                label="12 ?????n 17 Tu???i"
              />
              <FormControlLabel
                value="18"
                control={<Radio />}
                label="18 ?????n 25 Tu???i"
              />
              <FormControlLabel value="kh??c" control={<Radio />} label="Kh??c" />
            </RadioGroup>
            <FormHelperText></FormHelperText>
          </FormControl>
          <FormControl className="bases__margin--bottom10 w-100">
            <FormLabel>Ch???n ngh??? Nghi???p</FormLabel>
            <RadioGroup
              defaultValue=""
              row
              onChange={(e) => setJob({ job: e.target.value })}
            >
              <FormControlLabel
                control={<Radio value="Sinh Vi??n" />}
                label="Sinh Vi??n"
              />
              <FormControlLabel
                control={<Radio value="Nh??n Vi??n V??n Ph??ng" />}
                label="Nh??n Vi??n V??n Ph??ng"
              />
              <FormControlLabel value="kh??c" control={<Radio />} label="Kh??c" />
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
                    Ch???n ?????i
                  </InputLabel>
                  <Select onChange={(e) => setType({ type: e.target.value })}>
                    <MenuItem
                      value={10}
                      onChange={(e) => setType({ type: e.target.value })}
                    >
                      ????n
                    </MenuItem>
                    <MenuItem
                      value={20}
                      onChange={(e) => setType({ type: e.target.value })}
                    >
                      Gh??p ?????i
                    </MenuItem>
                  </Select>
                  <FormHelperText></FormHelperText>
                </FormControl>
                {/* 1) TextField */}
                <TextField
                  placeholder="Nh???p T??n Ng?????i ?????t"
                  label="T??n Ng?????i ?????t"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={currentUser.displayName}
                />

                {/* 2) TextField */}
                <TextField
                  placeholder="Nh???p S??? ??i???n Tho???i"
                  label="S??? ??i???n Tho???i"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={phoneUser}
                />

                {/* 3) TextField */}
                <TextField
                  placeholder="Nh???p ?????a Ch??? mail"
                  label="?????a Ch??? mail"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={currentUser.email}
                />
                <p>
                  ----------------------------------------------------------------------------------------------------
                </p>
                <h4 style={{ fontSize: "24px", marginBottom: "20px" }}>
                  S??n B??ng
                </h4>
                {/* 4) TextField */}
                <TextField
                  placeholder="Nh???p T??n S??n"
                  label="T??n S??n"
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
                    Ch???n S??n
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
                  placeholder="Nh???p S??? ??i???n Tho???i"
                  label="S??? ??i???n Tho???i"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  value={dataSan.phone}
                />

                {/* 3) TextField */}
                <TextField
                  placeholder="Nh???p ?????a Ch???"
                  label="?????a Ch???"
                  variant="outlined"
                  className="bases__margin--bottom15 w-100"
                  value={dataSan.address}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                  <Stack spacing={3}>
                    <DateTimePicker
                      className="bases__margin--bottom10"
                      minDate={new Date()}
                      renderInput={(props) => <TextField {...props} />}
                      label="Ng??y ?????t"
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
                  ?????t S??n
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
              Th??ng tin thanh to??n
            </h4>
            <div className="container bases__margin--bottom50">
              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  T??n S??n:
                </div>

                <div className="col bases__margin--bottom10">{dataSan.nameField}</div>
              </div>

              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  ?????a ch???:
                </div>
                <div className="col bases__margin--bottom10">{dataSan.address}</div>
              </div>

              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  Ng??y ?????t :
                </div>
                <div className="col bases__margin--bottom10">
                  Ng??y {NgayGio}
                </div>
              </div>

              <div className="row">
                <div className="col bases__text--bold base__text--16">Gi??:</div>
                <div className="col bases__margin--bottom10">{giaSan}</div>
              </div>

              {timeCheck >= 17 ? <>
                <div className="row">
                  <div className="bases__text--bold bases__text--red base__text--16"> L??u ??:</div>
                  <div className="bases__margin--bottom10 bases__text--red">
                    B???n ??ang ?????t s??n v??o khung gi??? v??ng ho???c bu???i t???i. ??i???u n??y s??? khi???n gi?? ti???n ban ?????u b??? thay ?????i. H??y ki???m tra th???t k??? tr?????c khi th???c hi???n !!!
                  </div>
                </div>

                <div className="row">
                  <div className="col bases__text--bold base__text--16 bases__text--red">Gi?? khung gi??? ?????c bi???t:</div>
                  <div className="col bases__margin--bottom10 bases__text--red">{parseInt(giaSan) + parseInt(dataSan.extra_price)} vnd</div>
                </div>
              </> : <></>}

              <div className="row">
                <div className="col bases__text--bold base__text--16">
                  Ng?????i ?????t:
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
                  S??? ??i???n tho???i li??n h???:
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
                H???y Thanh to??n
              </button>
            </div>
          </> : <>
            <h4 className="bases__margin--top20 text-center">
              Thanh to??n th??nh c??ng
            </h4>
            <div className=" d-flex justify-content-center bases__margin--top10">
              <img className="bases__width--150" src={icon_success} alt="" />
            </div>

            <div className=" d-flex justify-content-center">
              <button
                className="button-cancle bases__margin--top50"
                onClick={handleClose}
              >
                ????ng
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
      <button onClick={handleClickOpen} className="pages__detail-button bases__margin--top15 bases__margin--right30"> ?????t S??n</button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          ?????t S??n
        </BootstrapDialogTitle>
        <DialogContent dividers>{renderBodyModal()}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default FormModal;
