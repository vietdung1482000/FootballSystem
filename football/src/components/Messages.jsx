import React from 'react'
import styled from 'styled-components'
import Message from './Message'


const MessageS = styled.div`
    background-color: #ddddf7;
    padding: 10px;
    height: calc(100% - 160px); // magic :)))
    overflow: scroll;
`

export default function Messages() {
    return (
        <MessageS>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />

            <Message />
        </MessageS>
    )
}
