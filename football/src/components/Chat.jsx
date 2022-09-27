import React from 'react'
import styled from 'styled-components'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import More from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'

const ChatPage = styled.div`
  flex: 2;

  .chatInfo {
    height: 50px;
    background-color: #5d5b8d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: lightgray;

    .chatIcons {
      display: flex;
      gap: 10;

      img{
        height: 24px;
        cursor: pointer;
      }
    }

  }
`

export default function Chat() {

  const { data } = useContext(ChatContext)

  return (
    <ChatPage>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </ChatPage>
  )
}
