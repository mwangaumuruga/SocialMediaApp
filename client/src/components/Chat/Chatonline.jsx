import React, { useState } from 'react'
import { useEffect } from 'react';
import prof from '../../assets/Del.jpg';
// import './Chatonline.css'
import axios from 'axios';
import { domain } from '../../utils/utils';
const Chatonline = ({ id }) => {
    console.log(id);
    const [user, setUser] = useState("");
    useEffect(() => {
        const getUser = async () => {
            const { data } = await axios.get(`${domain}/user/${id}`);
            setUser(data.user);
        }
        getUser();
    }, []);
    return (
        <div className="user">
            <div className="userInfo">
                <img
                    className="chatOnlineImg"
                    src={user.profilePic}
                    alt=""
                />
                <div className="online"></div>

                <span>{user.username}</span>
            </div>
        </div>
    )
}

export default Chatonline
