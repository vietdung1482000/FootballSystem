import React from 'react'
import Sidebar from '../../components/Sidebar'
import Chat from '../../components/Chat'
import styled from 'styled-components'
import Media from '../../utils/media'

const HomeChat = styled.div`
  background-color: #a7bcff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const HomeContainer = styled.div`
  border: 1px solid white;
  border-radius: 10px;
  width: 65%;
  height: 80%;
  display: flex;
  overflow: hidden;

  ${Media.lessThan(Media.SIZE.MD)}{
    width: 90%;
  }
`

export default function Home() {
  return (
    <HomeChat>
      <HomeContainer>
        <Sidebar />
        <Chat />
      </HomeContainer>
    </HomeChat>
  )
}
