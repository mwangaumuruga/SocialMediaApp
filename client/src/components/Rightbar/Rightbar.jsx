import React, { useEffect, useState, useRef } from 'react'
import './Rightbar.css';
import profile from '../../assets/profile.jpg';
import charity from '../../assets/charity.jpg';
import sam from '../../assets/background.jpg';
import Del from '../../assets/Del.jpg';
import Dennis from '../../assets/Denis.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { getSuggested, createRelationship, followSuggested } from '../../redux/apicall'
import { FaUserCircle } from 'react-icons/fa'
import { io } from 'socket.io-client';
import Chatonline from '../Chat/Chatonline';
const Rightbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user?.data)
  const userid = useSelector((state) => state.user?.user?.data.id)
  const suggested = useSelector((state) => state.user?.suggestedUser);
  const currentuserid = useSelector((state) => state.user?.user?.data?.id);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotification] = useState([]);
  const socket = useRef();
  console.log(suggested);
  useEffect(() => {
    getSuggested(dispatch, userid);
  }, []);

  //get notifications

  useEffect(() => {
    socket?.current?.on("getnotifications", (data) => {
      setNotification((prev) => [...prev, data]);
    })
  }, [socket]);

  //get Online users
  useEffect(() => {
    socket.current = io("http://localhost:8080");
    //subscribe to event which is connecting
    socket.current.emit("new-user-add", user?.id)
    //get active users on frontned emit the same name
    socket.current.on("get-users", (users) => {
      console.log('check user');
      setOnlineUsers(users);
    })
  }, [user]);
  console.log(onlineUsers);


  // const createFollow = (userId, id) => {
  //   createRelationship(dispatch, { followeruserId: userId, followeduserId: id });

  // }
  return (
    <div className='rightbar'>
      <div className="container">
        <div className="item">
          <span>Friend Suggestions</span>
          {
            suggested?.map((user) => (
              <div className='user' key={user.id}>
                <div className='userInfo' alt='samkam'>
                  {user.profilePic ? <img src={user.profilePic} /> : <FaUserCircle />}
                  {/* <img src={user.profilePic} /> */}
                  <span>{user.username}</span>
                </div>
                <div className='buttons'>
                  <button className='follow' onClick={() => followSuggested(dispatch, { followeruserId: userid, followeduserId: user.id }, user)}>Follow</button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="item">
          <span>Notifications</span>
          <div className='user'>
            <div className='userInfo' alt='samkam'>
              <img src={profile} />
              <p>James Ngunga</p>
              <p>Followed you</p>
            </div>
            <span>1 day Ago</span>
          </div>
          <div className='user'>
            <div className='userInfo' alt='samkam'>
              <img src={sam} />
              <p>Chris Mureithi </p>
              <p>Liked your post</p>
            </div>
            <span>1 hr Ago</span>
          </div>
          <div className='user'>
            <div className='userInfo' alt='samkam'>
              <img src={profile} />
              <p>Samuel</p>
              <p>Commented on your post</p>
            </div>
            <span>1 min Ago</span>
          </div>
        </div>

        <div className="item" key={user?.id}>
          <span>Online Friends</span>
          {
            onlineUsers ?
              onlineUsers.map((user) => (
                <Chatonline id={user.userId} />
              )) : (
                <p>No online user</p>
              )
          }
        </div>

      </div>
    </div>
  )
}

export default Rightbar