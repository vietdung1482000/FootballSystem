import React from 'react'
import styled from 'styled-components'

const MessagePage = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  .messageInfo {
    display: flex;
    flex-direction: column;
    color: gray;
    font-weight: 300;


    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .messageContent {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p{
      padding: 10px 20px;
      background-color: white;
      border-radius: 0px 10px 10px 10px;
      max-width: max-content;
    }

    img{
      width: 50%;
    }
  }

  &.owner{
    flex-direction: row-reverse;

    .messageContent {
      align-items: flex-end;
      
      p{
        background-color: #8da4f1;
        color: white;
        border-radius: 10px 0px 10px 10px;
      }
    }

  }

`
export default function Message() {
  return (
    <MessagePage className='owner'>
      <div className="messageInfo">
        <img src="https://i.pinimg.com/564x/ee/de/19/eede196025d0807f66352d9b119e6437.jpg" alt="" />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>hellloo</p>
        <img src="https://i.pinimg.com/564x/ee/de/19/eede196025d0807f66352d9b119e6437.jpg" alt="" />
      </div>
    </MessagePage>
  )
}
