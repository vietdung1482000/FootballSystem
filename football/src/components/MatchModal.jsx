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
import {
  DialogTitle,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";

import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

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


function SimpleDialog(props) {
  const { onClose, open } = props;
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

  console.log('rowSelection', rowSelection);
  const handleClose1 = () => {
    onClose(rowSelection);
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

  const data123 = data.map((item) => ({
    id:item.id,
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
  }));
  const abc = data123.filter((item) => {
    if (("item.data", item.type === 20)) {
      return item;
    }
    return "";
  });
  const columns = useMemo(
    () => [
      {
        accessorKey: "nameField", //access nested data with dot notation
        header: "Tên Sân",
      },
      {
        accessorKey: "address",
        header: "Địa Chỉ",
      },
      {
        accessorKey: "name", //normal accessorKey
        header: "Tên Đội Bóng",
      },
      {
        accessorKey: "phone",
        header: "Số Điện Thoại",
      },
      {
        accessorKey: "email",
        header: "Địa chỉ mail",
      },
      {
        accessorKey: "age",
        header: "Tuổi",
      },
      {
        accessorKey: "job",
        header: "Ngành Nghề",
      },
      {
        accessorKey: "san",
        header: "Số Sân",
      },
      {
        accessorKey: "presetDate",
        header: "Ngày Đặt",
      },
    ],
    []
  );
  // return (
  //   <Dialog  open={open}>
  //     <DialogTitle>Set backup account</DialogTitle>
  //     <List sx={{ pt: 0 }}>
  //       <MaterialReactTable
  //         className="width-table"
  //         columns={columns}
  //         data={abc}
  //         enableMultiRowSelection={false} //use radio buttons instead of checkboxes
  //         enableRowSelection
  //         getRowId={(row) => row.id} //give each row a more useful id
  //         muiTableBodyRowProps={({ row }) => ({
  //           //add onClick to row to select upon clicking anywhere in the row
  //           onClick: row.getToggleSelectedHandler(),
  //           sx: { cursor: 'pointer' },
            
  //         })}
  //         onRowSelectionChange={setRowSelection} //connect internal row selection state to your own
  //         state={{ rowSelection }} 
  //       />
  //       <Button onClose={handleClose1} >abdef</Button>
  //     </List>
  //   </Dialog>
  // );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

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
  const [selectedValue, setSelectedValue] = React.useState([1]);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = (value) => {
    setOpen1(false);
    setSelectedValue(value);
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
        <div>
          <Typography variant="subtitle1" component="div">
            Selected: {selectedValue}
          </Typography>
          <br />
          <Button variant="outlined" onClick={handleClickOpen}>
            Open simple dialog
          </Button>
          <SimpleDialog
            selectedValue={selectedValue}
            open={open1}
            onClose={handleClose1}
          />
        </div>
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
      <button
        onClick={handleClickOpen}
        className="pages__detail-button bases__margin--top15 bases__margin--right30"
      >
        Ghép Đội
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
          Đăng Kí Ghép Đội
        </BootstrapDialogTitle>
        <DialogContent dividers>{openForm()}</DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default MatchModal;
