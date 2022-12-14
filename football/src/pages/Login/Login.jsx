import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';


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

        .checkbox {
            display: flex;
            label {
                color: #626262;
            }
        }

        input {
            padding: 15px;
            border: none;
            border-bottom: 1px solid #a7bcff;

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
        align-items: center;
        text-align: center;
        a {
            color: #000000;
            font-weight: bold;
            font-family: 'Poppins';
            font-style: normal;
            line-height: 24px;
            text-decoration: none;
        }
        a:hover {
            color: #119468;
        }
    }
`
const Button = styled.button`
    width: 350px;
    background: #119468;
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

export default function Login() {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);
  
    const getData = () => {
      const getdataDatSan = collection(db, "users");
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
    React.useEffect(() => {
      getData();
    }, []);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);        
                        navigate("/");
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <FormContainer>
            <FormWrapper>
                <span className="logo">????ng Nh???p</span>
                <span className="title">????ng nh???p ????? qu???n l?? t??i kho???n c???a b???n</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <div className="checkbox">
                        <input type="checkbox" value="lsRememberMe" id="rememberMe" /> <label for="rememberMe">Ghi Nh??? M???t Kh???u</label>
                    </div>
                    <Button>????ng Nh???p</Button>
                    {err && <span>???? x???y ra l???i!</span>}
                </form>
                <p>B???n ch??a c?? t??i kho???n? <Link to="/register">????ng K??</Link></p>
                <p><Link to="/">Qu??n M???t Kh???u?</Link></p>
            </FormWrapper>
        </FormContainer>
    )
}