import React from 'react'
import styled from 'styled-components'
import { Link  } from 'react-router-dom';

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
      margin-left: 300px;
      cursor: pointer;
      p{
        position: absolute;
        left: 320px;
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
      right: 200px;
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

    }
  }
`

export default function Menu() {
  return (
    <MenuTop>
      <div className="container">
        <Link className="symbol" to="/home">
          <p>F</p>
        </Link>
        <Link className="logo" to="/home" alt="">Football</Link>
        <div className="list_menu">
          <ul className="list_item">
            <li className="item">
              <Link className="link" to="/home">Trang Chủ</Link>
            </li>
            <li className="item">
              <Link className="link" to="/match">Thi Đấu</Link>
            </li>
          </ul>
        </div>
        <div className="Btn">
          <button className="item">
            <Link to="/login">Đăng Nhập</Link>
          </button>
          <button className="item">
            <Link to="/selectModule">Đăng Ký</Link>
          </button>
        </div>
      </div>
    </MenuTop>
  )
}
