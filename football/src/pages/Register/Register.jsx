import React, { useState } from 'react';
import styled from 'styled-components'
import addAvatar from '../../img/addAvatar.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const FormContainer = styled.div`
    background-image: url("https://res.cloudinary.com/dgei1mnlr/image/upload/v1663305598/Caps2/bg_nyjhye.png");
    background-position: right;
    background-size: cover;
    background-repeat: no-repeat;
    background-size: 40%;
    background-color: white;

    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const FormWrapper = styled.div`
    width: auto;
    height: auto;
    background-color: white;
    padding: 20px 60px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid gray;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
    border-radius: 30px;

    .logo {
        color: #5d5b8d;
        font-weight: bold;
        font-size: 24px;
        text-align: left;
    }

    .title {
        color: #5d5b8d;
        font-size: 12px;
        margin-bottom: 15px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 15px;

        input {
            padding: 15px;
            border: none;
            border-bottom: 1px solid #a7bcff;
            width: 300px;

            &::placeholder{
                color: rgb(175, 175, 175)
            }
        }

        label{
            display: flex;
            align-items: center;
            gap: 10px;
            color: #8da4f1;
            font-size: 12px;
            cursor: pointer;

            img {
                width: 32px;
            }
        }
    }

    p{
        color: #5d5b8d;
        font-size: 12px;
        margin-top: 12px;
    }
`
const Button = styled.button`
    width: 330px;
    background-color: #7b96ec;
    color: white;
    padding: 10px;
    font-weight: bold;
    border: none;
    border-radius: 25px;
    cursor: pointer;

    :hover{
       background-color: #82ccdd;
    }
`

export default function Register() {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        alert("Register success <3")
                        navigate("/login");
                    });
                }
            );
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <FormContainer>
            <FormWrapper>
                <span className="logo">Tạo tài khoản của bạn</span>
                <span className="title">Tạo tài khoản cá nhân</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Tên của bạn" />
                    <input type="email" placeholder="Nhập địa chỉ email" />
                    <input type="password" placeholder="Nhập mật khẩu" />
                    <input type="file" id="file" />
                    {/* <label htmlFor="file">
                        <img src={addAvatar} alt="" />
                        <span>Add an avatar</span>
                    </label> */}
                    <Button>Sign Up</Button>
                    {err && <span>Đã xảy ra lỗi!</span>}
                </form>
                <p>Đã có sẵn tài khoản? <Link to="/login">Đăng nhập</Link></p>
            </FormWrapper>
        </FormContainer>
    )
}
