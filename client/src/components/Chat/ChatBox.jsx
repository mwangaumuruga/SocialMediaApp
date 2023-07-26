import React, { useRef } from 'react'
import Message from './Message';
import './Chat.css'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getMessage, createMessage, addMessage } from '../../redux/apicall';
import InputEmoji from 'react-input-emoji'
import { useState } from 'react';
import moment from 'moment';
const ChatBox = ({ chat, currentUser, currentMember, setSendMessage, receiveMessage }) => {
    console.log(receiveMessage);
    const user = useSelector((state) => state?.user?.user?.data);
    const id = chat?.id;
    const receiverId = currentMember;
    const dispatch = useDispatch();
    const messages = useSelector((state) => state?.message?.messages);
    const [newmessage, setNewMessage] = useState("");
    const [mess, setMess] = useState([]);
    useEffect(() => {
        if (receiveMessage !== null && receiveMessage.chatId === chat?.id) {
            addMessage(dispatch, receiveMessage);
        }
    }, [receiveMessage]);

    useEffect(() => {
        console.log(chat?.id);
        getMessage(dispatch, id);
    }, [chat, currentUser])
    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    }
    const handleSend = (e) => {
        e.preventDefault();
        const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const message = {
            senderId: user?.id,
            content: newmessage,
            chatId: chat?.id,
            createdAt: createdAt
        }
        createMessage(dispatch, message);
        setNewMessage("");
        //receiverId
        setSendMessage({ ...message, receiverId });
    }
    return (
        <div className='chatBox'>
            <div className="chatBoxWrapper">
                <div className='chatBoxTop'>
                    {
                        messages?.map((message) => message?.senderId == user?.id ? (<Message own={true} message={message} key={message?.id} />) : (<Message message={message} key={message?.id} />))
                    }
                </div>
                <div className='chatboxbottom'>
                    <InputEmoji className='chatMessageInput' value={newmessage} onChange={handleChange} placeholder="Add comment" />
                    <button className='chatSubmitButton' onClick={handleSend}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ChatBox
