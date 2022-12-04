import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import {
  ModalCancel,
  ModalSubmit,
  ModalFooter,
  InputSpan,
  InputContainer,
  ModalBody,
  ModalHeader,
  customStyles,
} from "../StyledComponent/index";
import { addDoc, collection, getDocs } from "firebase/firestore";

function MatchModal(props) {
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());
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
    setName1("")
  };

  const abc = () => {
    return (
      <>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Tuổi</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="12"
              control={<Radio />}
              label="12-17 "
              onChange={(e) => setAge({ age: e.target.value })}
            />
            <FormControlLabel
              value="18"
              control={<Radio />}
              label="18-25 "
              onChange={(e) => setAge({ age: e.target.value })}
            />
            <FormControlLabel
              value="khác"
              control={<Radio />}
              label="khác"
              onChange={(e) => setAge({ age: e.target.value })}
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Nghề Nghiệp</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Sinh Viên"
              control={<Radio />}
              label="Sinh Viên"
              onChange={(e) => setJob({ job: e.target.value })}
            />
            <FormControlLabel
              value="Nhân Viên Văn Phòng"
              control={<Radio />}
              label="Nhân Viên Văn Phòng"
              onChange={(e) => setJob({ job: e.target.value })}
            />
            <FormControlLabel
              value="khác"
              control={<Radio />}
              label="khác"
              onChange={(e) => setJob({ job: e.target.value })}
            />
          </RadioGroup>
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


    let createWith = ""
     data.map((item) => {
      if(name1.name === item.data.name){
        createWith = item.data.createBy
      }
      return createWith;
    });

  const LoadName = () => {
    return (
      <>
        <InputContainer>
          <InputLabel>Tên Đội</InputLabel>
          <NativeSelect   onChange={(e) => setName1({ name: e.target.value })}>
            {
              data.map((item) => {
                if (item.data.age?.age || item.data.job?.job) {
                  // console.log('item', item);
                  const resultAge = item.data.age?.age.toString();
                  const resultJob = item.data.job?.job.toString();
                  if (age.age === resultAge && job.job === resultJob) {
                    return <option value ={item.data.name}>{item.data.name}</option>
                  }
                  else {
                    return ''
                  }
                }
              })
            }
          </NativeSelect>
        </InputContainer>
      </>
    )
  };
  const Loadsan = () => {
    return (
      <>
        <InputContainer>
          <InputLabel>Ngay Đặt</InputLabel>
          <NativeSelect defaultValue="" onChange={(e) => setPresetDate1({ presetDate: e.target.value })}>
            {
              data.map((item) => {
                  if (name1.name === item.data.name) {
                    return <option value={item.data.presetDate}  >{item.data.presetDate}</option>
                  }
                  else {
                    return ''
                }
              })
            }
          </NativeSelect>
        </InputContainer>
        <InputContainer>
          <InputLabel>Giờ Đặt</InputLabel> 
          <NativeSelect defaultValue="" onChange={(e) => setPresetTime1({ presetTime: e.target.value })}>
            {
              data.map((item) => {
                  if (name1.name === item.data.name) {
                    return <option value={item.data.presetTime} >{item.data.presetTime}</option>
                  }
                  else {
                    return ''
                }
              })
            }
          </NativeSelect>
        </InputContainer>
      </>
    )
  };
  return (
    <Modal
      isOpen={props.modalState}
      ariaHideApp={false}
      onRequestClose={props.openModal}
    // style={customStyles}
    // contentLabel="Example Modal"
    >
      <ModalHeader>Match</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          {LoadName()}
          <InputContainer>
            <InputSpan>Tên:</InputSpan>
            <input
              placeholder="Enter Name"
              value={currentUser.displayName}
            ></input>
          </InputContainer>
          <InputContainer>
            <InputSpan>Gmail:</InputSpan>
            <input placeholder="Enter Gmail" value={currentUser.email}></input>
          </InputContainer>
          <InputContainer>
            <InputSpan>Điện Thoại:</InputSpan>
            <input
              placeholder="Enter Phone"
              value={currentUser.phoneNumber}
            ></input>
          </InputContainer>
          {data.map((item) => { })}
          {abc()}
          <p>-------------------------------------------</p>
          <h4 style={{ fontSize: "24px", marginBottom: "20px" }}>Sân Bóng</h4>
          <InputContainer>
            <InputSpan>Tên Sân:</InputSpan>
            <input
              placeholder="Enter Name field"
              onChange={(e) => setNameField(e.target.value)}
              value={nameField}
            ></input>
          </InputContainer>
          <InputContainer>
            <InputSpan>Điện Thoại:</InputSpan>
            <input
              placeholder="Enter Phone"
              onChange={(e) => setPhoneBusiness(e.target.value)}
              value={phoneBusiness}
            ></input>
          </InputContainer>
          <InputContainer>
            <InputSpan>Địa Chỉ:</InputSpan>
            <input
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            ></input>
          </InputContainer>
         {Loadsan(  )}
        </ModalBody>
        <ModalFooter>
          <ModalSubmit>Submit</ModalSubmit>
          <ModalCancel onClick={props.openModal}>X</ModalCancel>
        </ModalFooter>
      </form>
    </Modal>
  );
}

export default MatchModal;
