import React from 'react'
import { useState, useContext } from 'react'
import styled from 'styled-components'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import { AuthContext } from "../context/AuthContext"

const SearchUers = styled.div`
  border-bottom: 1px solid gray;

  .searchForm {
    padding: 10px;

    input{
      background-color: transparent;
      border: none;
      color: white;
      outline: none;

      &::placeholder{
        color: lightgray;
      }
    }
  }

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
    }
  }

`

export default function Search() {

  const [userName, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", userName));


    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });

    } catch (err) {
      setErr(true)
    }
  }

  const handleSelect = async () => {

    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId+".userInfo"]: {
            uid:user.uid,
            displayName:user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId+".userInfo"]: {
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        });
      }
    } catch (err) {}
    console.log("user",user)
    setUser(null)
    setUserName("")

  }

  const handleKey = e => {
    e.code === "Enter" && handleSearch()
  }

  return (
    <SearchUers>
      <div className="searchForm">
        <input type="text" placeholder='Find a friend' onKeyDown={handleKey} value={userName} onChange={e => setUserName(e.target.value)} />
      </div>
      {err && <span>User not found!</span>}
      {user && <div className="userChat" onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </SearchUers>
  )
}
