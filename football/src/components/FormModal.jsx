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
import PaypalCheckoutButton from './PaypalButton';

function FormModal(props) {
    const { register, handleSubmit } = useForm();
    const [startDate, setStartDate] = useState(new Date());
    const product = {
        description: "test",
        price: 19
      };

    const onSubmit = async data => {
        if (data.Name && data.Date && data.Time) {
            props.onModalSubmit(data)
            props.openModal()
        }
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
            <form >
                <ModalBody>
                    <InputContainer>
                        <InputSpan>Tên:</InputSpan>
                        <InputField placeholder='Enter Name' {...register("Name", { required: 'error' })}></InputField>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Gmail:</InputSpan>
                        <InputField placeholder='Enter Gmail' {...register("Gmail", { required: 'error' })}></InputField>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Điện Thoại:</InputSpan>
                        <InputField placeholder='Enter Phone' {...register("PhoneUser", { required: 'this is requiredd' })}></InputField>
                    </InputContainer>
                    <p>-------------------------------------------</p>
                    <h4 style={{ fontSize: "24px", marginBottom: "20px" }}>Sân Bóng</h4>
                    <InputContainer>
                        <InputSpan>Tên Sân:</InputSpan>
                        <InputField placeholder='Enter Name field' {...register("NameField", { required: 'this is requiredd' })}></InputField>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Điện Thoại:</InputSpan>
                        <InputField placeholder='Enter Phone' {...register("Phone", { required: 'this is requiredd' })}></InputField>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Địa Chỉ:</InputSpan>
                        <InputField placeholder='Enter Address' {...register("Address", { required: 'this is requiredd' })}></InputField>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Ngày Đặt:</InputSpan>
                        {/* <DatePicker selected={startDate} {...register("Date", { required: 'this is requiredd' })} min="1" max="31" onChange={(date) => setStartDate(date)} /> */}
                        <InputField {...register("Date", { required: 'this is requiredd' })} min="1" max="31" placeholder="Type a number 1 - 31"></InputField>
                    </InputContainer>
                    <InputContainer>
                        <InputSpan>Thời Gian Đặt:</InputSpan>
                        <InputField {...register("Time", { required: 'this is requiredd' })} min="1" max="24" type="number" placeholder="Type a number 1 - 24"></InputField>
                    </InputContainer>
                </ModalBody>
                <ModalFooter>
                    <div className="paypal-button-container">
                        <PaypalCheckoutButton product={product}  test ={handleSubmit(onSubmit)}/>
                    </div>
                    <ModalCancel onClick={props.openModal}>X</ModalCancel>
                </ModalFooter>
            </form>
        </Modal>
    )
}

export default FormModal