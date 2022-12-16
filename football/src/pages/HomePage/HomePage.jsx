import { collection, getDocs } from 'firebase/firestore';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import CustomizedTables from '../../components/admin';
import CustomizedDialogs from '../../components/CustomizedDialogs';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase';
import BG from '../../img/bg.png';

const HomeStyle = styled.div`
  width: 100%;
  
  ._home{
    display: flex;

    ._title {
      width: 60%;
      text-align: center;
      margin-top: 150px;
      margin-left: 80px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      
      h2 {
        align-items: center;
        color: #119468;
        line-height: 40px;
        text-align: left;
        margin-left: 300px;
      }

      p {
        margin-left: 300px;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: #626262;
      }
    }

    .bg {
      width: 40%;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`

const Button = styled.button`
    margin-top: 75px;
    margin-left: 45px;
    width: 300px;
    color: white;
    padding: 10px;
    font-weight: bold;
    border: none;
    background: #119468;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.8), inset 0px -3px 6px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    cursor: pointer;

    :hover{
       background-color: #43b891;
    }
`

export default function HomePage() {
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
  const { currentUser } = useContext(AuthContext)
  const loadData = () => {
  var dataclone = _.cloneDeep(data);
    if(currentUser) {
      const data123 = dataclone.find((item) => item.data.uid === currentUser.uid)
      if(data123?.data.rule === "business" && data123?.data.status === false) {
        return (
          
          <div>
            <img src="https://giaidieu.com/sites/default/files/ckeditor-images/cach-tang-toc-do-tai-trang-web.jpg" alt="" className='imgeerror'/>
          </div>
        )
      } else if(data123?.data.rule === "admin") {
        return (
          <CustomizedTables/>
        )
      }
      else return (
        <HomeStyle>
        <div className="_home">
          <div className="_title">
            <h2 className="football">FOOTBALL</h2>
            <h2>NỀN TẢNG ĐẶT SÂN - TÌM ĐỐI</h2>
            <p>Ở đây là phần thông tin thêm</p>
            <Link  to={`/match`} underline="none" >
              <Button>Tìm hiểu thêm</Button>
            </Link>
          </div>
          <div className="bg">
            <img src={BG} alt="" />
          </div>
        </div>
      </HomeStyle>
      )
    }
    else {
      return (
        <HomeStyle>
        <div className="_home">
          <div className="_title">
            <h2 className="football">FOOTBALL</h2>
            <h2>NỀN TẢNG ĐẶT SÂN - TÌM ĐỐI</h2>
            <p>Ở đây là phần thông tin thêm</p>
            <Link  to={`/match`} underline="none" >
              <Button>Tìm hiểu thêm</Button>
            </Link>
          </div>
          <div className="bg">
            <img src={BG} alt="" />
          </div>
        </div>
      </HomeStyle>
      )
    }
  
  }

  return (
    <div>
    {loadData()}
    </div>
  )
}
