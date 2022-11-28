import { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { db } from "../firebase";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { AuthContext } from "../context/AuthContext"
import {
  ModalCancel,
  ModalSubmit,
  ModalFooter,
  InputSpan,
  InputContainer,
  ModalBody,
  ModalHeader,
} from "../StyledComponent/index";
import { addDoc, collection } from "firebase/firestore";
import PaypalCheckoutButton from './PaypalButton';

const product = {
  description: "test",
  price: 19
};

function FormModal(props) {
  const { register, handleSubmit } = useForm();
  const [startDate, setStartDate] = useState(new Date());

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nameField, setNameField] = useState("");
  const [phoneBusiness, setPhoneBusiness] = useState("");
  const [address, setAddress] = useState("");
  const [presetDate, setPresetDate] = useState("");
  const [presetTime, setPresetTime] = useState("");
  const [age, setAge] = useState("");
  const [job, setJob] = useState("");
  const [type, setType] = useState("");
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({});
  const [check, setCheck] = useState(false);

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
      setPresetTime("");
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
        setCheck(false)
        if (props.onChangeModal) {
          props.onChangeModal(true)
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const abc = () => {
    if (type.type === '20') {
      return (
        <>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Tuổi</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="12"
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
              defaultValue="Sinh Viên"
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
      presetDate: presetDate,
      presetTime: presetTime,
      age: age,
      job: job,
      type: type,
      createBy: currentUser.uid,
    });
    setSubmit(true)
  }

  const onChangeVl = (value) => {
    setCheck(value)
  }
  const renderBodyModal = () => {
    if (submit === false) {
      return <>
        <InputContainer>
          <InputLabel>Loại</InputLabel>
          <NativeSelect defaultValue={10} onChange={(e) => setType({ type: e.target.value })}>
            <option value={10} onChange={(e) => setType({ type: e.target.value })}>Đơn</option>
            <option value={20} onChange={(e) => setType({ type: e.target.value })} >Ghép Đội</option>
          </NativeSelect>
        </InputContainer>
        <InputContainer>
          <InputSpan>Tên:</InputSpan>
          <input
            placeholder="Enter Name"
            value={currentUser.displayName}
          ></input>
        </InputContainer>
        <InputContainer>
          <InputSpan>Gmail:</InputSpan>
          <input
            placeholder="Enter Gmail"
            value={currentUser.email}
          ></input>
        </InputContainer>
        <InputContainer>
          <InputSpan>Điện Thoại:</InputSpan>
          <input
            placeholder="Enter Phone"
            onChange={(e) => setPhone(e.target.value)}
            value={currentUser.phoneNumber}
          ></input>
        </InputContainer>
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
        <InputContainer>
          <InputSpan>Ngày Đặt:</InputSpan>
          {/* <DatePicker selected={startDate} {...register("Date", { required: 'this is requiredd' })} min="1" max="31" onChange={(date) => setStartDate(date)} /> */}
          <input
            type="number"
            onChange={(e) => setPresetDate(e.target.value)}
            value={presetDate}
            placeholder="Type a number 1 - 31"
          ></input>
        </InputContainer>
        <InputContainer>
          <InputSpan>Thời Gian Đặt:</InputSpan>
          <input
            type="number"
            onChange={(e) => setPresetTime(e.target.value)}
            value={presetTime}
            placeholder="Type a number 1 - 24"
          ></input>
        </InputContainer>
        {abc()}
      </>
    } else {
      return <>

        <h4 className="bases__margin--top50 bases__padding--left100" >Thông tin thanh toán</h4>
        <div className="container bases__padding--left150 bases__margin--bottom50">
          <div className="row">

            <div className="col-3 bases__text--bold base__text--16">
              Tên Sân
            </div>

            <div className="col">
              {nameField}
            </div>
          </div>

          <div className="row">
            <div className="col-3 bases__text--bold base__text--16">
              Địa chỉ
            </div>
            <div className="col">
              {address}
            </div>
          </div>

          <div className="row">
            <div className="col-3 bases__text--bold base__text--16">
              Ngày đặt
            </div>
            <div className="col">
             Ngày {presetDate} vào lúc {presetTime} giờ
            </div>
          </div>

          <div className="row">
            <div className="col-3 bases__text--bold base__text--16">
              Giá
            </div>
            <div className="col">
              250.000 vnd
            </div>
          </div>

          <div className="row">
            <div className="col-3 bases__text--bold base__text--16">
              Người đặt
            </div>
            <div className="col">
              {currentUser.displayName}
            </div>
          </div>

          <div className="row">
            <div className="col-3 bases__text--bold base__text--16">
              email
            </div>
            <div className="col">
              {currentUser.email}
            </div>
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
          <PaypalCheckoutButton product={product} check={(value) => { onChangeVl(value) }} />
          <button className="button-cancle bases__margin--left50" onClick={props.openModal}>Cancle</button>
        </div>
      </>
    }
  }

  const { currentUser } = useContext(AuthContext)
  return (
    <Modal
      isOpen={props.modalState}
      ariaHideApp={false}
      onRequestClose={props.openModal}
    //   style={customStyles}
    //   contentLabel="Example Modal"
    >
      <ModalHeader>Book A Football Field</ModalHeader>
      <ModalBody>
        {renderBodyModal()}
      </ModalBody>
      <ModalFooter>
        {!submit ?
          <>
            <ModalSubmit onClick={submitForm} >Submit</ModalSubmit>
            <ModalCancel onClick={props.openModal}>X</ModalCancel>
          </>
          : <></>}
      </ModalFooter>
    </Modal>
  );
}

export default FormModal;
