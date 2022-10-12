import React from 'react'
import styled from 'styled-components'
import BG from '../../img/bg.png'
import addAvatar from '../../img/addAvatar.png';

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
                    display: flex;
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
                        padding: 20px;
                        background: #FFFFFF;
                        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
                        border-radius: 30px;
                        margin: 25px;
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
    return (
        <ResBusiness>
            <div className="resBusiness">
                <div className="form">
                    <div className='bgc'>
                        <p>Thông Tin</p>
                    </div>
                    <div className="content">
                        <p>Nhập thông tin sân bóng</p>
                        <form >
                            <div className="left">
                                <input type="text" placeholder="Tên sân bóng" />
                                <input type="email" placeholder="Số điện thoại" />
                                <textarea placeholder='Giới thiệu' width="48" height="48" />
                                <input style={{ display: "none" }} type="file" id="file" />
                                <div className="lg">
                                    <label htmlFor="file">
                                        <img src={addAvatar} alt="" />
                                    </label>
                                </div>
                            </div>


                            <div className="right">
                                <input type="email" placeholder="Tên từng sân" />
                                <input type="text" placeholder="Thời gian mở" />
                                <input type="text" placeholder="Thời gian đóng" />
                                <input type="password" placeholder="Địa chỉ" />
                                {/* <div class="custom-select" style={{ width: "200px" }}>
                                    <select>
                                        <option value="0">Loại Sân</option>
                                        <option value="1">Sân 5</option>
                                        <option value="1">Sân 7</option>
                                        <option value="1">Sân 10</option>
                                    </select>
                                </div> */}
                            </div>
                        </form>
                        <textarea className="_detail" placeholder='Chi tiết' id="" cols="60" rows="10"></textarea> <br />
                        <Button>Hoàn Tất</Button>
                    </div>
                </div>
                <div className="bg">
                    <img src={BG} alt="" />
                </div>
            </div>
        </ResBusiness>
    )
}
