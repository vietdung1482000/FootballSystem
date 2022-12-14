import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import BG from '../img/bg.png'
import USER from '../img/icon_USER.png'
import BO from '../img/icon_BO.png'

const SelectM = styled.div`
    width: 100%;
    display: flex;
    .module {
        width: 60%;
        .bgc {
            position: absolute;
            width: 600px;
            height: 70px;
            left: 445px;
            top: 200px;
            z-index: 99;
            background: #119468;
            border-radius: 25px 25px 0px 0px;

            p {
                position: absolute;
                left: 70px;
                top: 10px;
                z-index: 999;

                font-family: 'Poppins';
                font-style: normal;
                font-weight: 700;
                font-size: 20px;
                line-height: 30px;
                display: flex;

                color: #FFFFFF;
            }
        }
        .content {
            position: absolute;
            width: 600px;
            height: 420px;
            left: 445px;
            top: 200px;
            
            background: #FFFFFF;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
            border-radius: 30px;
            display: flex;
            img {
                width: 300px;
                height: 300px;
                margin-top: 80px;
                padding: 80px;
                cursor: pointer;
            }
        }
        p {
            position: absolute;
            width: 798px;
            height: 49px;
            left: 360px;
            top: 620px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            text-align: center;
            color: rgba(0, 0, 0, 0.6);

            a {
                text-decoration: none;
                color: #000;

                &:hover {
                   color: #119468; 
                }
            }
        }
    }
    .bg {
      width: 40%;

      img {
        width: 100%;
        height: 100%;
      }
    }
`

export default function SelectModule() {
    return (
        <SelectM>
            <div className="module">
                <div className='bgc'>
                    <p>T???o t??i kho???n c???a b???n</p>
                </div>
                <div className="content">
                    <Link to="/register">
                        <img src={USER} alt="" />
                    </Link>
                    <Link to="/resbusiness">
                        <img src={BO} alt="" />
                    </Link>
                </div>
                <p>???? c?? s???n t??i kho???n? <Link to="/login">????ng nh???p</Link></p>
            </div>
            <div className="bg">
                <img src={BG} alt="" />
            </div>
        </SelectM>
    )
}
