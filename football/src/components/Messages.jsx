import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import Message from './Message'
import { ChatContext } from '../context/ChatContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const MessageS = styled.div`
    background-color: #ddddf7;
    padding: 10px;
    height: calc(100% - 160px); // magic :)))
    overflow: scroll;
`

export default function Messages() {

    const [messages, setMessages] = useState([])
    const { data } = useContext(ChatContext)


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unSub()
        }
    }, [data.chatId])

    console.log(messages);

    return (
        <MessageS>
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </MessageS>
    )
}
