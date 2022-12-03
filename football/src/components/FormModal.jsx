import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import { AuthContext } from "../context/AuthContext";
import { addDoc, collection } from "firebase/firestore";
import PaypalCheckoutButton from "./PaypalButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from 'moment';
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

const product = {
  description: "test",
  price: 19,
};
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


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameField, setNameField] = useState("");
  const [phoneBusiness, setPhoneBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [presetDate, setPresetDate] = useState(new Date());
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [type, setType] = useState("");
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({});
  const [check, setCheck] = useState(false);

  const NgayGio = moment(presetDate).format("YYYY/MM/DD HH:MM")
  useEffect(() => {
    if (props.modalState) {
      setSubmit(false);
      setName("");
      setEmail("");
      setPhone("");
      setNameField("");
      setPhoneBusiness("");
      setAddress("");
      setPresetDate("");
      setAge("");
      setJob("");
      setType("");
    }
  }, [props.modalState]);

  useEffect(() => {
    if (check) {
      onSubmit();
    }
  }, [check]);

  const onSubmit = async () => {
    const colRef = collection(db, "datsan");
    await addDoc(colRef, data)
      .then(() => {
        setCheck(false);
        if (props.onChangeModal) {
          props.onChangeModal(true);
        }
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
            {/* <Choice
              items={[
                {
                  id: 'radio_1',
                  text: '12 đến 17 Tuổi',
                  value: '12',
                },
                {
                  id: 'radio_2',
                  text: '18 đến 25 Tuổi',
                  value: '18',
                },
                {
                  id: 'radio_3',
                  text: 'Khác',
                  value: 'Khác',
                },
              ]}
              type="radio"
            /> */}
            <RadioGroup
              defaultValue=""
              row
              onChange={(e) => console.log(e.target.value)}
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
      phone: currentUser.phoneNumber,
      nameField: nameField,
      phoneBusiness: phoneBusiness,
      address: address,
      presetDate: NgayGio,
      age: age,
      job: job,
      type: type,
      createBy: currentUser.uid,
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
                  value={currentUser.phoneNumber}
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
                  onChange={(e) => setNameField(e.target.value)}
                  value={nameField}
                />
                <TextField
                  placeholder="Nhập Số Điện Thoại"
                  label="Số Điện Thoại"
                  variant="outlined"
                  className="bases__margin--bottom10 w-100"
                  onChange={(e) => setPhoneBusiness(e.target.value)}
                  value={phoneBusiness}
                />

                {/* 3) TextField */}
                <TextField
                  placeholder="Nhập Địa Chỉ"
                  label="Địa Chỉ"
                  variant="outlined"
                  className="bases__margin--bottom15 w-100"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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
        <>
          <h4 className="bases__margin--top50 bases__padding--left100">
            Thông tin thanh toán
          </h4>
          <div className="container bases__padding--left150 bases__margin--bottom50">
            <div className="row">
              <div className="col-3 bases__text--bold base__text--16">
                Tên Sân
              </div>

              <div className="col">{nameField}</div>
            </div>

            <div className="row">
              <div className="col-3 bases__text--bold base__text--16">
                Địa chỉ
              </div>
              <div className="col">{address}</div>
            </div>

            <div className="row">
              <div className="col-3 bases__text--bold base__text--16">
                Ngày đặt
              </div>
              <div className="col">
                Ngày {NgayGio}
              </div>
            </div>

            <div className="row">
              <div className="col-3 bases__text--bold base__text--16">Giá</div>
              <div className="col">250.000 vnd</div>
            </div>

            <div className="row">
              <div className="col-3 bases__text--bold base__text--16">
                Người đặt
              </div>
              <div className="col">{currentUser.displayName}</div>
            </div>

            <div className="row">
              <div className="col-3 bases__text--bold base__text--16">
                email
              </div>
              <div className="col">{currentUser.email}</div>
            </div>

            <div className="row">
              <div className="col-3 bases__text--bold base__text--16">
                Số điện thoại liên hệ
              </div>
              <div className="col">
                {currentUser.phoneNumber ? currentUser.phoneNumber : phone}
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
              onClick={props.openModal}
            >
              Cancle
            </button>
          </div>
        </>
      );
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { currentUser } = useContext(AuthContext);
  return (
    <div>
      <p onClick={handleClickOpen}>Đặt Sân</p>
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
