import React from 'react'
import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


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

  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data())
      });

      return () => {
        unsub();
      }
    }

    currentUser.uid && getChats()
  }, [currentUser.uid])


  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
  }

  return (
    <ChatsPage>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map(chat => (
        <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </ChatsPage>
  )
}
