import React from 'react'
import styled from 'styled-components'
import SB from "../img/sanbong.png"
import Rank from "../img/rank.png"

const Card = styled.div`
  background-image: url("https://res.cloudinary.com/dgei1mnlr/image/upload/v1665459488/Caps2/sanbong_j8s9uc.png");
  background-position: right;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: white;
  box-shadow: 3px -3px 15px 5px rgba(0, 0, 0, 0.25);
  border-radius: 25px;

  ._content {
    width: 350px;
    height: 185px;

    /* background: rgba(5, 35, 25, 0.8); */
    border-radius: 0px 0px 25px 25px;
    ._title {
      
    }
  }
`

export default function Box() {
  return (
    <Card>
      <div className="_content">

        <div className="_title">
          <h1>Sân bóng Nguyễn Hữu Thọ</h1>
        </div>
        <div className="_rank">
          <img src={Rank} alt="" />
        </div>
        <div className="_location">
          <span>250 Nguyễn Hữu Thọ</span>
        </div>

        <button>Đặt sân</button>
      </div>
    </Card>
  )
}
