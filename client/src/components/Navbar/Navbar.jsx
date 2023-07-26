import React from 'react'
import { MdHome, MdPhoneAndroid, MdOutlineHome, MdMessage, MdDashboard, MdNotifications, } from 'react-icons/md'
import { BsFillMoonFill } from 'react-icons/bs'
import { BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import DarkMode from '../Darkmode';
import { useSelector, useDispatch } from 'react-redux';

import './Navbar.css';
const Navbar = () => {
  const profilepic = useSelector((state) => state.user?.user?.data?.profilePic);
  const user = useSelector((state) => state.user.user?.data?.username);
  const id = useSelector((state) => state.user.user?.data?.id);
  return (
    <div className='navbar'>
      <div className='left'>
        <Link to='/'>
          <span style={{ color: "#DEC9EE" }}>Let's talk</span>
        </Link>
        <div className='icon'>
          <DarkMode />
        </div>
      </div>
      <div className='center'>
        <input type='text' placeholder='Search' style={{ borderRadius: "20px", width: '218px', height: "58px", backgroundColor: "gray" }} />
        <div className='icon'>
          <MdHome />
        </div>
        <div className='icon'>
          <MdMessage />
        </div>
      </div>
      <div className='rightpart'>
        <div className='icon'>
          <MdDashboard />
        </div>
        <div className='icon'>
          <MdNotifications />
        </div>
        <div className='user'>
          <img src={profilepic} alt='profile' />
          <Link to={`/profile/${id}`} style={{ textDecoration: "none" }}>
            <span>{user}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar