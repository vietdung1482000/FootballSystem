import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import {  collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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
export default function Message({ message }) {

  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)

  const [data1, setData1] = useState([]);

  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message]);

  const getData = () => {
    const getdataDatSan = collection(db, "ghepdoi");
    getDocs(getdataDatSan)
      .then((response) => {
        const datsans = response.docs.map((doc) => ({
          data1: doc.data(),
          id: doc.id,
        }));
        setData1(datsans);
      })
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    getData();
  }, []);

  const confirm = () => {
    <>
      {data1.map((item) => {
        if(item.data1.createWith === currentUser.uid && item.data1.createWith === ""){
          <h1> xin chào</h1>
        }
      })}
    </>
  }
  return (
    <MessagePage ref={ref} className={`${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {confirm()}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </MessagePage>
  )
}
