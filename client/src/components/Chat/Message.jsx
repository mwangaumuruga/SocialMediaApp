import React, { useRef, useEffect, useState } from 'react'
import './message.css'
import sarah from '../../assets/sarah.jpg'
import { format } from "timeago.js";
import { getuser } from '../../redux/apicall';
import { useDispatch } from 'react-redux';
import { domain } from '../../utils/utils';
import axios from 'axios';
const Message = ({ message, own }) => {
    const scroll = useRef();
    const [mypic, setMypic] = useState();
    useEffect(() => {
        const getMypic = async () => {
            const { data } = await axios.get(`${domain}/user/${message.senderId}`);
            console.log(data.user.profilePic);
            setMypic(data.user.profilePic);
        }
        getMypic();
    }, []);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);
    console.log(message);
    return (
        <div ref={scroll} className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={mypic}
                    alt=""
                />
                <p className="messageText">{message?.content}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message
