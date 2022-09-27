import React, { useContext } from 'react'
import styled from 'styled-components'
import Media from '../utils/media'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Nav = styled.div`
  display: flex;
  align-items: center;
  background-color: #2f2d52;
  height: 50px;
  padding: 10px;
  justify-content: space-between;
  color: #ddddf7;

  .logo {
    font-weight: bold;

    ${Media.lessThan(Media.SIZE.MD)}{
      display: none;
    }
  }

  .user {
    display: flex;
    gap: 10px;

    img {
      background-color: #ddddf7;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      object-fit: cover;
    }

    button {
      background-color: #5d5d5d;
      color: #ddddf7;
      font-size: 12px;
      border: none;
      cursor: pointer;

      ${Media.lessThan(Media.SIZE.MD)}{
        bottom: 10px;
        position: absolute;
      }
      
    }
    button:hover {
      background-color: #a7bcff;
      color: #333;
    }
  }
`

export default function Navbar() {
  const { currentUser } = useContext(AuthContext)
  return (
    <Nav>
      <span className="logo">Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </Nav>
  )
}
