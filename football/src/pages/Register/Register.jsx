import React from 'react'
import styled from 'styled-components'
import addAvatar from '../../img/addAvatar.png';

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
    width: 350px;
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
            width: 250px;

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
    return (
        <FormContainer>
            <FormWrapper>
                <span className="logo">Create your account</span>
                <span className="title">Create an ccount to manage</span>
                <form>
                    <input type="text" placeholder="your name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input style={{ display: "none" }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={addAvatar} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <Button>Sign Up</Button>
                </form>
                <p>You do have a account? <a href="/login">Login</a></p>
            </FormWrapper>
        </FormContainer>
    )
}
