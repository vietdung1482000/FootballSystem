import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase';

const MenuTop = styled.div`
  width: 100%;
  .container {
    width: 100%;
    /* position: fixed; */
    display: flex;
    background: white;

    .symbol {
      background-color: #119468;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      text-decoration: none;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 700;
      font-size: 36px;
      line-height: 54px;
      display: flex;
      align-items: center;
      text-align: center;
      color: #FFFFFF;
      margin-left: 250px;
      cursor: pointer;
      p{
        position: absolute;
        left: 270px;
        top: -30px;
      }
    }

    .logo {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      display: flex;
      align-items: center;
      text-align: center;
      text-decoration: none;
      color: #000000;
      margin-left: 15px;
      cursor: pointer;
    }
    .list_menu {
      margin-left: 5px;
      .list_item {
        display: flex;
        font-family: 'Poppins';
        margin-top: 15px;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-align: center;
        li {
          list-style: none;
          margin-left: 50px;
          a {
            text-decoration: none;
            color: #626262;
          }
          a:hover{
            color: #119468;
          }
        }
      }
    }

    .Btn {
      display: flex;
      position: absolute;
      right: 150px;
      top: 15px;      
      
      button {
        background-color: #119468;
        border: 1px solid #119468;
        border-radius: 25px;
        width: 100px;
        height: 40px;
        margin-right: 20px;
        cursor: pointer;
        a{
          color: white;
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          text-decoration: none;
        }
      }
      button:hover {
        background-color: #27ae60;
      }

      .userInfo {
        display: flex;
        position: relative;
        /* display: inline-block; */
        h1{
          font-size: 14px;
          margin-right: 15px;
          cursor: pointer;
        }

        img {
          width: 30px;
          height: 30px;
          border: 1px solid #000;
          border-radius: 100%;
          cursor: pointer;
        }

        .dropdown-content {
          display: none;
          position: absolute;
          top: 40px;
          left: 40px;
          z-index: 1;
          cursor: pointer;
        }

        &:hover .dropdown-content {
          display: block;
        }

      }

    }
  }
`

export default function Menu() {

  const { currentUser } = useContext(AuthContext)
  console.log(currentUser)

  return (

    <MenuTop>
      <div className="container align-items-center">
        <Link className="symbol" to="/">
          <div className='bases__margin--left20'>F</div>
        </Link>
        <Link className="logo" to="/" alt="">Football</Link>
        <div className="list_menu">
          <ul className="list_item ">
            <li className="item">
              <Link className="link" to="/">Trang Chủ</Link>
            </li>
            <li className="item">
              <Link className="link" to="/detail">Sân bóng</Link>
            </li>
            <li className="item">
              <Link className="link" to="/match">Thi Đấu</Link>
            </li>
          </ul>
        </div>



        <div className="Btn">
          {currentUser === null
            ?
            <div>
              <button className="item"><Link to="/login">Đăng Nhập</Link></button>
              <button className="item"><Link to="/selectModule">Đăng Ký</Link></button>
            </div>
            :
            <div className="userInfo">
              <h1>{currentUser?.displayName}</h1>
              <img src={currentUser?.photoURL} alt="" />
              <div className="dropdown-content">
                <button onClick={() => signOut(auth)}>logout</button>
              </div>
            </div>
          }
        </div>


      </div>
    </MenuTop>
  )
}
