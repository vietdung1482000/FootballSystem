import React from 'react'
import styled from 'styled-components'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const SideBar = styled.div`
  flex: 1;
  background-color: #3e3c61;
  position: relative;
`

export default function Sidebar() {
  return (
    <SideBar>
      <Navbar />
      <Search />
      <Chats />
    </SideBar>
  )
}
