import React, { useState, useContext, useEffect, useMemo } from "react";
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
import SearchIcon from '@mui/icons-material/Search';
import {
  DialogTitle,
  FormHelperText,
  IconButton,
  List,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid } from "@mui/x-data-grid";
const _ = require("lodash");

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
  const { dataSan, recallAPI } = props;

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [name, setName] = useState("");
  const [name1, setName1] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // const file = e.target[3].files[0];
  const [presetDate1, setPresetDate1] = useState("");
  const [presetTime1, setPresetTime1] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [confirm, setconfirm] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState("");
  const [getData22, setGetData] =  useState([]);
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
  const dataClone =  getData22.find((item) => item.id === currentUser.uid)
  const phoneUser = dataClone?.data.phone 
  var deepCopy = _.cloneDeep(selectedRows);
  const handleClickOpen = () => {
    setOpen(true);
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
    if (recallAPI) {
      recallAPI();
    }
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const onSubmit = async (data) => {
    const colRef = collection(db, "ghepdoi");
    await addDoc(colRef, {
      name: currentUser.displayName,
      email: currentUser.email,
      phone: phoneUser,
      nameField: dataSan.nameField,
      phoneBusiness: dataSan.phone,
      address: dataSan.address,
      presetDate1: deepCopy.presetDate,
      age: deepCopy.age,
      job: deepCopy.job,
      createBy: currentUser.uid,
      name1: deepCopy.name,
      confirm: "",
      createWith: createWith,
      id: deepCopy.id
    })
      .then(() => {
        alert("Register success <3");
        getData2()
        getData()
        handleClose()
      })
      .catch((err) => {
        alert(err.message);
      });
    setName("");
    setEmail("");
    setPhone("");
    setPresetDate1("");
    setPresetTime1("");
    setAge("");
    setJob("");
    setName1("");
  };

  let createWith = "";
  data.map((item) => {
    if (item.data.name) {
      createWith = item.data.createBy;
    }
    return createWith;
  });
  const openForm = () => {
    return (
      <div className="box" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <form>
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
              className="bases__margin--bottom10 w-100 "
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
            <h4 style={{ fontSize: "24px", marginBottom: "20px" }}>S??n B??ng</h4>
            {/* 4) TextField */}
            <TextField
              placeholder="Nh???p T??n S??n"
              label="T??n S??n"
              variant="outlined"
              className="bases__margin--bottom10 w-100"
              value={dataSan.nameField}
            />
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
            <div >
            <TextField
              placeholder="T??n ?????i"
              className="bases__margin--bottom10 tendoi"
              value={deepCopy.name}
            />
            <SearchIcon onClick = {handleClickOpen} className="iconOpen"/>
            </div>
            <div>
            <TextField
              placeholder="Ng??y ?????t"
              className="bases__margin--bottom10 tendoi"
              value={deepCopy.presetDate}
            />
             <SearchIcon onClick = {handleClickOpen} className="iconOpen"/>
            </div>
           
            {/* Radio Buttons */}
            {/* Select */}
            {LoadDialog()}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="bases__margin--bottom20 w-100 bases__margin--top30"
            >
              ????ng K??
            </Button>
          </form>
        </div>
      </div>
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
 const getData2 = () => {
    const getdataDatSan = collection(db, "ghepdoi");
    getDocs(getdataDatSan)
      .then((response) => {
        const datsans = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id,
        }));
        setData1(datsans);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData2();
  }, []);
  
 const columns = [
    {
      field: "name",
      headerName: "T??n ?????i B??ng",
      width: 150,
    },
    {
      field: "age",
      headerName: "Tu???i",
      width: 150,
      editable: true,
    },
    {
      field: "job", //normal field
      headerName: "Ng??nh Ngh???",
      width: 150,
      editable: true,
    },
    {
      field: "san", //normal field
      headerName: "S??? S??n",
      width: 150,
      editable: true,
    },
    {
      field: "presetDate", //normal field
      headerName: "Ng??y ?????t",
      width: 150,
      editable: true,
    },
  ];
  const data123 = data.map((item) => ({
    id: item.id,
    nameField: item.data.nameField,
    address: item.data.address,
    name: item.data.name,
    phone: item.data.phone,
    email: item.data.email,
    job: item.data.job.job,
    age: item.data.age.age,
    san: item.data.san,
    presetDate: item.data.presetDate,
    type: item.data.type.type,
    xacnhan: item.xacnhan,
  }));
  const abc = data123.filter((item) => {
    if (
      item.type === 20 &&
      dataSan.nameField === item.nameField &&
      item.xacnhan === undefined
    ) {
      return item;
    }
    return "";
  });

  const LoadDialog = () => {
    return (
      <Dialog onclose={handleClose1} open={open1}>
        <DialogTitle>Danh S??ch ????ng k?? gh??p ?????i</DialogTitle>
        <List sx={{ pt: 0 }}>
          <div style={{ height: 500, width: 600 }}>
            <DataGrid
              columns={columns}
              rows={abc}
              pageSize={10}
              rowsPerPageOptions={[10]}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowss = abc.filter((row) =>
                  selectedIDs.has(row.id)
                );
                setSelectedRows(...[...selectedRowss]);
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="bases__margin--bottom20 w-30 bases__margin--top30 bases__margin--left170"
            onClick={handleClose1}
          >
            X??c Nh???n
          </Button>
          <Button
            variant="contained"
            type="submit"
            className="bases__margin--bottom20 w-30 bases__margin--top30 bases__margin--left50 colorIconDong"
            onClick={handleClose1}
          >
            ????ng
          </Button>
        </List>
      </Dialog>
    );
  };
  return (
    <div>
      <button
        onClick={handleClickOpen}
        className="pages__detail-button bases__margin--top15 bases__margin--right30"
      >
        Gh??p ?????i
      </button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          ????ng K?? Gh??p ?????i
        </BootstrapDialogTitle>
        <DialogContent dividers>{openForm()}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default MatchModal;
