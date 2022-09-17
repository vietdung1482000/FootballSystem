import React from 'react'
import styled from 'styled-components'

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
  return (
    <SearchUers>
      <div className="searchForm">
        <input type="text" placeholder='Find a friend' />
      </div>
      <div className="userChat">
        <img src="https://i.pinimg.com/564x/aa/96/d3/aa96d306185d893fed80919b74afb7e4.jpg" alt="" />
        <div className="userChatInfo">
          <span>dungvv</span>
        </div>
      </div>
    </SearchUers>
  )
}
