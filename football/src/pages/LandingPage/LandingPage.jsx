import * as React from 'react';
import styled from 'styled-components'
import Location from '../../img/location.png'
import Calender from '../../img/calendar.png'
import Match from '../../img/archery-match.png'
import SuggestionFootball from '../../components/layout/SuggestionFootball'

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
    h1{
      margin-left: 250px;
      margin-top: 50px;
    }

    ._card {
      margin-left: auto;
      display: flex;
      width: 100%;
      cursor: pointer;
      ._cardImg {
        width: 25%;
      }
    }

  }

`

export default function LandingPage() {

  const tempDataSuggest = [
    {
      tensan: 'sân bóng nguyễn hữu thọ',
      location: ' 250 Nguyễn hữu thọ',
      rate: 5
    },
    {
      tensan: 'sân bóng nguyễn hữu thọ',
      location: ' 250 Nguyễn hữu thọ',
      rate: 4
    },
    {
      tensan: 'sân bóng nguyễn hữu thọ',
      location: ' 250 Nguyễn hữu thọ',
      rate: 3
    },
    {
      tensan: 'sân bóng nguyễn hữu thọ',
      location: ' 250 Nguyễn hữu thọ',
      rate: 5
    },
    {
      tensan: 'sân bóng nguyễn hữu thọ',
      location: ' 250 Nguyễn hữu thọ',
      rate: 5
    },
  ]

  return (
    <Landing>
      <div className="_title">
        FOOTBALL <br />
        NỀN TẢNG ĐẶT SÂN - TÌM ĐỐI
      </div>
      <div className="_input">
        <input type="text" placeholder='Nhập tên sân bóng' />
        <button>Tìm kiếm</button>
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
          {tempDataSuggest.map((data, index) => {
            return (
                <div className="_cardImg" key={index}>
                  <SuggestionFootball detail={data} />
                </div>
            )
          })}
        </div>
      </div>
    </Landing>
  )
}
