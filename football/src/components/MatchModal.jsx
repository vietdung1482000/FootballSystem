import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";

import { addDoc, collection, getDocs } from "firebase/firestore";
import {
  DialogTitle,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";


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

function MatchModal(props) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const file = e.target[3].files[0];
  const [nameField, setNameField] = useState("");
  const [phoneBusiness, setPhoneBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [presetDate1, setPresetDate1] = useState("");
  const [presetTime1, setPresetTime1] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [confirm, setconfirm] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (data) => {
    const colRef = collection(db, "ghepdoi");
    await addDoc(colRef, {
      name: currentUser.displayName,
      email: currentUser.email,
      phone: currentUser.phoneNumber,
      nameField: nameField,
      phoneBusiness: phoneBusiness,
      address: address,
      presetDate1: presetDate1,
      presetTime1: presetTime1,
      age: age,
      job: job,
      createBy: currentUser.uid,
      name1: name1,
      confirm: "",
      createWith: createWith,
    })
      .then(() => {
        alert("Register success <3");
      })
      .catch((err) => {
        alert(err.message);
      });
    setName("");
    setEmail("");
    setPhone("");
    setNameField("");
    setPhoneBusiness("");
    setAddress("");
    setPresetDate1("");
    setPresetTime1("");
    setAge("");
    setJob("");
    setName1("");
  };
  // console.log('job', job);
  // console.log('age', age);

  const CheckBox = () => {
    return (
      <>
        <FormControl className="bases__margin--bottom10 w-100">
          <FormLabel>Chọn Tuổi</FormLabel>
          <RadioGroup defaultValue="" row onChange={(e) => setAge({ age: e.target.value })}>
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
          <RadioGroup defaultValue="" row onChange={(e) => setJob({ job: e.target.value })}>
            <FormControlLabel
              value="Sinh Viên"
              control={<Radio />}
              label="Sinh Viên"
            />
            <FormControlLabel
              value="Nhân Viên Văn Phòng"
              control={<Radio />}
              label="Nhân Viên Văn Phòng"
            />
            <FormControlLabel value="khác" control={<Radio />} label="Khác" />
          </RadioGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
      </>
    );
  };

  const getData = () => {
    const getdataDatSan = collection(db, "datsan");
    getDocs(getdataDatSan)
      .then((response) => {
        const datsans = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setData(datsans);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getData();
  }, []);

  let createWith = "";
  data.map((item) => {
    if (name1.name === item.data.name) {
      createWith = item.data.createBy;
    }
    return createWith;
  });

  const LoadName = () => {
    return (
      <>
        <FormControl className="bases__margin--top10 w-100">
          <InputLabel
            id="filled-select-currency"
            select
            label="Select"
            helperText="Please select your currency"
            variant="filled"
          >
            Chọn Đội
          </InputLabel>
          <Select
            defaultValue=""
            onChange={(e) => setName1({ name: e.target.value })}
          >
            {data.map((item) => {
              if (item.data.age?.age || item.data.job?.job) {
                const resultAge = item.data.age?.age.toString();
                const resultJob = item.data.job?.job.toString();
                if (age.age === resultAge) {
                   <MenuItem value={item.data.name} >{item.data.name}</MenuItem>
                } else {
                  return "";
                }
              } else {
                return "";
              }
            })}
          </Select>

          {/* <select defaultValue="" onChange={(e) => setName1({ name: e.target.value })} value={name} name="cars" id="cars">
            {data.map((item) => {
              if (item.data.age?.age || item.data.job?.job) {
                const resultAge = item.data.age?.age.toString();
                const resultJob = item.data.job?.job.toString();
                if (age.age === resultAge && job.job === resultJob) {
                  console.log('item.data.name', item.data.name);
                  return (
                    <option value={item.data.name}>{item.data.name}</option>
                  );
                } else {
                  return "";
                }
              } else {
                return "";
              }
            })}
          </select> */}

          <FormHelperText></FormHelperText>
        </FormControl>
      </>
    );
  };


  const LoadGioDatSan = () => {
    return (
      <>
        <FormControl className="bases__margin--top10 w-100">
          <InputLabel
            id="filled-select-currency"
            select
            label="Select"
            helperText="Please select your currency"
            variant="filled"
          >
            Chọn Ngày Đặt
          </InputLabel>
          <Select
            defaultValue=""
            onChange={(e) => setPresetDate1({ presetDate: e.target.value })}
          >
            {data.map((item) => {
              if (name1.name === item.data.name) {
                return (
                  <MenuItem value={item.data.presetDate}>
                    {" "}
                    {item.data.presetDate}
                  </MenuItem>
                );
              } else {
                return "";
              }
            })}
          </Select>
        </FormControl>
        <FormControl className="bases__margin--top10 w-100">
          <InputLabel
            id="filled-select-currency"
            select
            label="Select"
            helperText="Please select your currency"
            variant="filled"
          >
            Chọn Giờ Đặt
          </InputLabel>
          <Select
            defaultValue=""
            onChange={(e) => setPresetTime1({ presetTime: e.target.value })}
          >
            {data.map((item) => {
              if (name1.name === item.data.name) {
                return (
                  <MenuItem value={item.data.presetTime}>
                    {item.data.presetTime}
                  </MenuItem>
                );
              } else {
                return "";
              }
            })}
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
      </>
    );
  };

  const openForm = () => {
    return (
      <div className="box" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <form>
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
            <h4 style={{ fontSize: "24px", marginBottom: "20px" }}>Sân Bóng</h4>
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
            {/* Radio Buttons */}
            {CheckBox()}
            {/* Select */}
            {LoadName()}
            {LoadGioDatSan()}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="bases__margin--bottom20 w-100 bases__margin--top30"
            >
              Đăng Kí
            </Button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <div>
      <button onClick={handleClickOpen} className="pages__detail-button bases__margin--top15 bases__margin--right30">Ghép Đội</button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Đăng Kí Ghép Đội
        </BootstrapDialogTitle>
        <DialogContent dividers>{openForm()}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default MatchModal;
