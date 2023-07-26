import React, { useState } from 'react'
import './Conv.css';
import profile from '../../assets/profile.jpg';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getuser, chatUser } from '../../redux/apicall';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { domain } from '../../utils/utils';
const Conv = ({ data, user, members, onlineUsers }) => {
    console.log(onlineUsers);
    const [userInfo, setUser] = useState([]);
    const dispatch = useDispatch();
    // const user = useSelector((state) => state.currentUser.user);
    useEffect(() => {
        const getUserinfo = async () => {
            console.log(members, user);
            const id = members?.find((id) => id !== user);
            const { data } = await axios.get(`${domain}/user/${id}`);
            setUser(data.user);

        }
        getUserinfo();
    }, []);

    const onlineStatus = () => {
        const id = members?.find((id) => id !== user);
        console.log(id);
        // const chatMember = chat?.members?.find((member) => member !== user?.id);
        const online = onlineUsers?.find((user) => user?.userId === id)
        return online ? true : false;
    }
    console.log(onlineStatus());
    return (
        <div className='conversation'>
            {onlineStatus() && <div className='online-dot'></div>}
            <img src={userInfo.profilePic} alt='profile' style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
            <span>{onlineStatus() ? "Online" : "Offline"}</span>
            <span style={{ color: "black" }}>{userInfo?.username}</span>
        </div>
    )
}

export default Conv