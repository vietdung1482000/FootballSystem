import * as React from 'react';
import styled from 'styled-components'
import Location from '../../img/location.png'
import Calender from '../../img/calendar.png'
import Match from '../../img/archery-match.png'
import SuggestionFootball from '../../components/layout/SuggestionFootball'
import { useState } from 'react';
import { db } from '../../firebase';
import { useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Loading } from '../../components/layout/Loading';
import Clear from '../../img/close.png'


const Landing = styled.div`
  width: 100%;

  ._title{
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 50px;
    margin-left: 250px;
    margin-top: 100px;
    color: #119468;
  }
  ._input {
    margin-left: 250px;
    margin-top: 20px;
    height: 50px;
    border: 1px solid #119468;
    border-radius: 25px;
    background: #FFFFFF;
    width: 1100px;
    input {
      width: 50%;
      border: none;
      padding: 10px;
      margin-top: 2px;
      margin-left: 15px;
    }

    button {
      float: right;
      color: #fff;
      background: #119468;
      border-radius: 25px;
      width: 100px;
      height: 50px;
      cursor: pointer;

      &:hover {
        background: #116e4f;
      }
    }
  }

  ._service{
    h1 {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 40px;
      line-height: 60px;
      text-align: center;
      margin-top: 100px;
      color: #000000;
      text-transform: capitalize;
    }

    ._grBox {
      display: flex;
      margin-top: 20px;
      margin-left: 220px;
      ._box {
        width: 350px;
        padding: 25px;
        margin-left: 22px;
        img {
          width: 50px;
          height: 50px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        h4{
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          color: #000000;
        }
        p{
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 21px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #626262;
        }
      }
    }

  }

  ._suggest{
    margin-left: 130px;
    h1{
      margin-left: 30px;
      margin-top: 50px;
    }

    ._card {
      display: flex;
      flex-wrap: wrap;
      cursor: pointer;
      ._cardImg {}
    }

  }

`

export default function LandingPage() {

  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [valueSearch, setValueSearch] = useState("");

  const getData = () => {
    setLoading(true);
    const getFootBallData = collection(db, 'business')
    getDocs(getFootBallData)
      .then(response => {
        const datsans = response.docs.map(doc => ({
          data: doc.data(),
          id: doc.id,
        }))
        setData(datsans)
        setDataSearch(datsans)
        setLoading(false);
      })
  }
  useEffect(() => {
    getData()
  }, []);

  const searchData = () => {
    const search = data.filter((dataSearch) => dataSearch.data.nameField.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1)
    setDataSearch(search)
  }

  const clearDataSearch = () => {
    setValueSearch("");
    getData();
  }

  return (
    <Landing>
      <Loading loader={loading} />
      <div className="_title">
        FOOTBALL <br />
        NỀN TẢNG ĐẶT SÂN - TÌM ĐỐI
      </div>

      <div className="_input">
        <input className='bases__input--outline' type="text" placeholder='Nhập tên sân bóng' value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} />
        <button onClick={searchData}>Tìm kiếm</button>
        <img onClick={clearDataSearch} className='bases__width--20 bases__margin--left380 bases__p--cursor' src={Clear} alt="" />
      </div>

      <div className="_service">
        <div className="_titleService">
          <h1>Dịch vụ của FootBall</h1>
          <div className="_grBox">
            <div className="_box">
              <img src={Location} alt="" />
              <h4>Tìm kiếm và đặt một sân bóng trực tuyến</h4>
              <p>Thông tin tòa gần vị trí của bạn nhất, đặt phòng trực tuyến, thuận tiện, dễ dàng</p>
            </div>
            <div className="_box">
              <img src={Calender} alt="" />
              <h4>Công cụ quản lý sân bóng trực tuyến</h4>
              <p>Quản lý lịch đặt chỗ đơn giản, nhận đặt chỗ trực tuyến dễ dàng, lấp đầy bãi trống</p>
            </div>
            <div className="_box">
              <img src={Match} alt="" />
              <h4>Tạo một đội, tìm một trận đấu dễ dàng</h4>
              <p>Thông tin tòa gần vị trí của bạn nhất, đặt phòng trực tuyến, thuận tiện, dễ dàng</p>
            </div>
          </div>
        </div>
      </div>

      <div className="_suggest">
        <h1>Gợi ý sân bóng</h1>
        <div id="football" className="_card">
          {dataSearch.map((item, index) => {
            return (
              <div className="_cardImg" key={index}>
                <SuggestionFootball detail={item} />
              </div>
            )
          })}
        </div>
      </div>
    </Landing>
  )
}
