import { useState } from 'react';
import Modal from 'react-modal'
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { db } from '../firebase'

import {
    ModalCancel,
    ModalSubmit,
    ModalFooter,
    InputField,
    InputSpan,
    InputContainer,
    ModalBody,
    ModalHeader,
    customStyles
} from '../StyledComponent/index'
import { addDoc, collection } from 'firebase/firestore';

function FormModal(props) {
    const { register, handleSubmit } = useForm();
    const [startDate, setStartDate] = useState(new Date());

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone,setPhone] = useState("");
    // const file = e.target[3].files[0];
    const [nameField,setNameField] = useState("");
    const [phoneBusiness,setPhoneBusiness] = useState("");
    const [address, setAddress] = useState("");
    const [presetDate, setPresetDate] = useState("");
    const [presetTime, setPresetTime] = useState("");


    const onSubmit = async (data) => {
        const colRef = collection(db, "datsan")
        await addDoc(colRef, {
            name: name,
            email: email,
            phone: phone,
            nameField: nameField,
            phoneBusiness: phoneBusiness,
            address: address,
            presetDate: presetDate,
            presetTime: presetTime
        })
        .then(()=> {
            alert("Register success <3");
        })
        .catch(err => {
            alert(err.message)
        })
        setName('')
        setEmail('')
        setPhone('')
        setNameField('')
        setPhoneBusiness('')
        setAddress('')
        setPresetDate('')
        setPresetTime('')
    }

    return (
        <Modal
            isOpen={props.modalState}
            ariaHideApp={false}
            onRequestClose={props.openModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <ModalHeader>Book A Football Field</ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <InputContainer>
                        <InputSpan>Tên:</InputSpan>
                        <input placeholder='Enter Name' onChange={(e)=> setName(e.target.value)} value={name}></input>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Gmail:</InputSpan>
                        <input placeholder='Enter Gmail' onChange={(e)=> setEmail(e.target.value)} value={email}></input>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Điện Thoại:</InputSpan>
                        <input placeholder='Enter Phone' onChange={(e)=> setPhone(e.target.value)} value={phone}></input>
                    </InputContainer>
                    <p>-------------------------------------------</p>
                    <h4 style={{fontSize: "24px", marginBottom: "20px"}}>Sân Bóng</h4>
                    <InputContainer>
                        <InputSpan>Tên Sân:</InputSpan>
                        <input placeholder='Enter Name field' onChange={(e)=> setNameField(e.target.value)} value={nameField}></input>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Điện Thoại:</InputSpan>
                        <input placeholder='Enter Phone' onChange={(e)=> setPhoneBusiness(e.target.value)} value={phoneBusiness}></input>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Địa Chỉ:</InputSpan>
                        <input placeholder='Enter Address' onChange={(e)=> setAddress(e.target.value)} value={address}></input>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Ngày Đặt:</InputSpan>
                        {/* <DatePicker selected={startDate} {...register("Date", { required: 'this is requiredd' })} min="1" max="31" onChange={(date) => setStartDate(date)} /> */}
                        <input type="number" onChange={(e)=> setPresetDate(e.target.value)} value={presetDate} placeholder="Type a number 1 - 31"></input>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Thời Gian Đặt:</InputSpan>
                        <input type="number" onChange={(e)=> setPresetTime(e.target.value)} value={presetTime} placeholder="Type a number 1 - 24"></input>
                    </InputContainer>
                </ModalBody>
                <ModalFooter>
                    <ModalSubmit>Submit</ModalSubmit>
                    <ModalCancel onClick={props.openModal}>X</ModalCancel>
                </ModalFooter>
            </form>
        </Modal>
    )
}

export default FormModal