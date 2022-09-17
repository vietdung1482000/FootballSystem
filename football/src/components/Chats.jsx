import React from 'react'
import styled from 'styled-components'


const ChatsPage = styled.div`
  .userChat{
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    cursor: pointer;

    &:hover{
      background-color: #2f2d52;
    }

    img{
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .userChatInfo{
      span{
        font-size: 18px;
        font-weight: 500;
      }

      p{
        font-size: 14px;
        color: lightgray;
        margin-top: 5px;
      }
    }
  }
`

export default function Chats() {
  return (
    <ChatsPage>
      <div className="userChat">
        <img src="https://i.pinimg.com/564x/aa/96/d3/aa96d306185d893fed80919b74afb7e4.jpg" alt="" />
        <div className="userChatInfo">
          <span>dungvv</span>
          <p>king</p>
        </div>
      </div>
      <div className="userChat">
        <img src="https://i.pinimg.com/564x/aa/96/d3/aa96d306185d893fed80919b74afb7e4.jpg" alt="" />
        <div className="userChatInfo">
          <span>dungvv</span>
          <p>king</p>
        </div>
      </div>
    </ChatsPage>
  )
}
