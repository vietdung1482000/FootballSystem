import React, { useState } from 'react'
import styled from 'styled-components'
import BG from '../../img/bg.png'
import addAvatar from '../../img/addAvatar.png';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase";

const ResBusiness = styled.div`
    width: 100%;
    .resBusiness {
        width: 100%;
        position: relative;
        .form {
            position: absolute;
            width: 670px;
            height: auto;
            left: 325px;
            top: 68px;
            z-index: 99;
            background: #FFFFFF;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
            border-radius: 30px;

            .bgc {
                padding: 5px;
                background: #119468;
                border-radius: 25px 25px 0px 0px;
                p{
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 20px;
                    line-height: 30px;
                    display: flex;
                    align-items: center;
                    color: #FFFFFF;
                    margin-left: 30px;
                    margin-top: 15px;
                }
            }

            .content {
                p {
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 24px;
                    display: flex;
                    align-items: center;
                    margin-left: 40px;
                    color: rgba(0, 0, 0, 0.6);
                }

                ._detail {
                    margin-left: 50px;
                    padding: 20px 40px;
                    background: #FFFFFF;
                    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
                    border-radius: 30px;
                }
                form {
                    width: 100%;
                    margin-left: 10px;
                    padding: 10px;
                    .left{
                        float: left;
                        width: 50%;
                    }
                    .right {
                        width: 50%;
                        float: right;
                    }
                    input {
                        padding: 15px;
                        background: #FFFFFF;
                        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
                        border-radius: 30px;
                        margin: 20px;
                    }

                    textarea {
                        margin-top: 20px;
                        margin-left: 30px;
                        background: #FFFFFF;
                        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
                        border-radius: 30px;
                        padding: 20px;
                    }

                    select {
                        width: 100px;
                    }
                    .lg {
                        img {
                            width: 80px;
                            margin-top: 20px;
                            margin-left: 20px;

                        }
                    }
                }
            }

        }

        .bg {
            position: absolute;
            height: 680px;
            left: 1024px;
            top: 100px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
`
const Button = styled.button`
    width: 350px;
    background: #119468;
    color: white;
    padding: 15px;
    font-weight: bold;
    border: none;
    margin-top: 20px;
    margin-left: 20%;
    border-radius: 25px;
    cursor: pointer;

    :hover{
       background-color: #82ccdd;
    }
`


export default function RegisterBusiness() {

    // const db = getFirestore()
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const [nameField, setNameField] = useState("");
    const [phone, setPhone] = useState("");
    const [infoField,setInfoField] = useState("");
    // const file = e.target[3].files[0];
    const [nameSingleField,setNameSingleField] = useState("");
    const [timeOpen, setTimeOpen] = useState("");
    const [timeClose, setTimeClose] = useState("");
    const [address, setAddress] = useState("");
    const [detail, setDetail] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const colRef = collection(db, "business")
        await addDoc(colRef, {
            nameField: nameField,
            phone: phone,
            infoField: infoField,
            nameSingleField: nameSingleField,
            timeOpen: timeOpen,
            timeClose: timeClose,
            address: address,
            detail: detail
        })
        .then(()=> {
            alert("Register success <3");
            navigate("/login");
        })
        .catch(err => {
            alert(err.message)
        })
        setNameField('')
        setPhone('')
        setInfoField('')
        setNameSingleField('')
        setTimeOpen('')
        setTimeClose('')
        setAddress('')
        setDetail('')
    };

    return (
        <ResBusiness>
            <div className="resBusiness">
                <div className="form">
                    <div className='bgc'>
                        <p>Thông Tin</p>
                    </div>
                    <div className="content">
                        <p>Nhập thông tin sân bóng</p>
                        <form onSubmit={handleSubmit}>
                            <div className="left">
                                <input type="text" placeholder="Tên sân bóng" onChange={(e)=> setNameField(e.target.value)} value={nameField} />
                                <input type="text" placeholder="Số điện thoại" onChange={(e)=> setPhone(e.target.value)} value={phone} />
                                <textarea placeholder='Giới thiệu' width="48" height="48" type="text" onChange={(e)=> setInfoField(e.target.value)} value={infoField} />
                                <input style={{ display: "none" }} type="file" id="file" />
                                <div className="lg">
                                    <label htmlFor="file">
                                        <img src={addAvatar} alt="" />
                                    </label>
                                </div>
                            </div>

                            <div className="right">
                                <input type="text" placeholder="Tên từng sân" onChange={(e)=> setNameSingleField(e.target.value)} value={nameSingleField} />
                                <input type="text" placeholder="Thời gian mở" onChange={(e)=> setTimeOpen(e.target.value)} value={timeOpen} />
                                <input type="text" placeholder="Thời gian đóng" onChange={(e)=> setTimeClose(e.target.value)} value={timeClose} />
                                <input type="text" placeholder="Địa chỉ" onChange={(e)=> setAddress(e.target.value)} value={address} />
                            </div>

                            <textarea type="text" onChange={(e)=> setDetail(e.target.value)} value={detail} className="_detail" placeholder='Chi tiết' id="" cols="60" rows="10"></textarea> <br />
                            <Button>Hoàn Tất</Button>
                            {err && <span>Đã xảy ra lỗi!</span>}
                        </form>
                    </div>
                </div>
                <div className="bg">
                    <img src={BG} alt="" />
                </div>
            </div>
        </ResBusiness>
    )
}
