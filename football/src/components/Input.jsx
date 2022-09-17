import React from 'react'
import styled from 'styled-components'
import Img from '../img/img.png'
import Attach from '../img/attach.png'

const InputMess = styled.div`
  height: 50px;
  background-color: #fff;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 100%;
    outline: none;
    border: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder {
      color: lightgray;
    }
  }

  .send {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
      height: 24px;
      cursor: pointer;
    }

    button {
      border: none;
      padding: 10px 15px;
      color: white;
      background-color: #8da4f1;
      cursor: pointer;
    }

  }


`

export const Input = () => {
  return (
    <InputMess>
      <input type="text" placeholder='Type something ....' />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display: "none"}} id="file" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </InputMess>
  )
}

export default Input