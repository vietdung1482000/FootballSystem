import React from 'react'
import styled from 'styled-components'
import BG from '../../img/bg.png'
import addAvatar from '../../img/addAvatar.png';

const ResBusiness = styled.div`
    width: 100%;
    .resBusiness {
        width: 100%;
        display: flex;
        .form {
            width: 50%;
            height: 650px;
            margin-left: 350px;
            margin-top: 30px;
            background: #FFFFFF;
            box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
            border-radius: 30px;

            .content {
                form {
                    display: flex;
                    width: 100%;
                    .left{
                        float: left;
                        width: 50%;
                    }
                    .right {
                        width: 50%;
                        float: right;
                    }
                    input {
                        padding: 10px;
                        background: #FFFFFF;
                        box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
                        border-radius: 30px;
                        margin: 25px;
                    }
                }
            }

        }




        .bg {
            width: 50%;
            height: 700px;
            img {
                width: 100%;
                height: 100%;
            }
        }
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
                                <input style={{ display: "none" }} type="file" id="file" />
                                <label style={{ marginLeft: "50px" }} htmlFor="file">
                                    <img src={addAvatar} alt="" />
                                </label>
                                <input type="email" placeholder="Số điện thoại" />
                                <input placeholder='Giới thiệu' width="48" height="48" />

                            </div>


                            <div className="right">
                                <input type="email" placeholder="Tên từng sân" />
                                <input type="text" placeholder="Thời gian mở" />
                                <input type="text" placeholder="Thời gian đóng" />
                                <input type="password" placeholder="Địa chỉ" />
                                <div class="custom-select" style={{ width: "200px" }}>
                                    <select>
                                        <option value="0">Sân 5</option>
                                        <option value="1">Sân 7</option>
                                        <option value="1">Sân 10</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                        <textarea placeholder='Chi tiết' id="" cols="30" rows="10"></textarea> <br />
                        <button>Hoàn Tất</button>
                    </div>
                </div>
                <div className="bg">
                    <img src={BG} alt="" />
                </div>
            </div>
        </ResBusiness>
    )
}
