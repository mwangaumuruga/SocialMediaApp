import React, { useEffect, useState, useRef } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { Link } from 'react-router-dom';
import { BiRepost } from 'react-icons/bi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import './Post.css';
import Comments from '../Comments/Comments';
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { getlikePost, createlikepost, deletelikepost, deletePost } from '../../redux/apicall';
import likesSlice from '../../redux/likesSlice';
import { io } from 'socket.io-client';
const Post = ({ post }) => {
    const dispatch = useDispatch();
    const socket = useRef();
    const comments = useSelector((state) => state?.comment?.comments);
    const user = useSelector((state) => state?.user?.user?.data);
    const token = useSelector((state) => state.user.user.accesToken);
    const likedpost = useSelector((state) => state?.likes?.likes)
    const array = post?.image;
    const string = JSON.stringify(array).replace(/[[\]]/g, '').replace(/'/g, '').replace(/^"|"$/g, '');
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setmenuOpen] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([]);

    const [likedPost, setLikedPost] = useState();
    let [likedPst, setLikedPst] = useState();
    const liked = true;
    useEffect(() => {
        const getLikes = async () => {
            const { data, likes } = await getlikePost(dispatch, post?.id);
            console.log(data);
            setLikedPost(data);
            setLikedPst(data.length);
        }
        getLikes();
    }, []);

    useEffect(() => {
        //get username based on the userId
        socket.current = io("http://localhost:8080")
        socket?.current?.emit("new-user-add", post?.userId)
        socket?.current?.on("get-users", (users) => {
            console.log('check user', users);
            setOnlineUsers(users);
        })
    }, []);

    const handleNotification = (receiverName, receiverId, type) => {
        socket.current.emit('sendnotification', {
            senderName: user.username,
            receiverName,
            receiverId,
            type
        })
        console.log(user.username, receiverName);

    }

    const handleLiked = () => {
        if (likedPost?.includes(user?.id)) {
            //unlike post
            if (likedPst >= 1) {
                likedPst = setLikedPst(likedPst - 1);
                deletelikepost(dispatch, { likesuserId: user.id, likespostId: post.id }, post.id);
                handleNotification(post.username, post.userId, 1);
            } else {
                likedPst = setLikedPst(likedPst + 1);
                createlikepost(dispatch, { likesuserId: user.id, likespostId: post.id });
                handleNotification(post.username, post.userId, 1);
            }
        } else {
            if (likedPst <= 0) {
                likedPst = setLikedPst(likedPst + 1);
                createlikepost(dispatch, { likesuserId: user.id, likespostId: post.id });
                handleNotification(post.username, post.userId, 1);
            } else {
                likedPst = setLikedPst(likedPst - 1);
                deletelikepost(dispatch, { likesuserId: user.id, likespostId: post.id }, post.id);
                handleNotification(post.username, post.userId, 1);
            }
        }
    }

    const handleDelete = () => {
        console.log("deleted");
        deletePost(post.id, dispatch, token);
    }
    return (
        <div className='post'>
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={post.profilePic} alt={post.profilePic} />
                        <div className="details">
                            <Link to={`/profile/${post.userId[0]}`} style={{ textDecoration: "none" }}>
                                <span className='name'>{post.username}</span>
                            </Link>
                            <span className='date'>{moment(post.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <div>
                        <MoreHorizIcon onClick={() => setmenuOpen(!menuOpen)} style={{ cursor: "pointer" }} />
                        {menuOpen && <button onClick={handleDelete} className='btn'>Delete</button>}
                    </div>
                </div>
                <div className="content">
                    <p>{post.description}</p>
                    <img src={string} alt="" />
                </div>
                <div className="info">
                    <div className="item" color='red'>
                        {likedPost?.includes(user.id) && likedPst > 0 ? <p style={{ color: "red" }}><FavoriteOutlinedIcon onClick={handleLiked} /></p> : <p style={{ color: "black" }}><FavoriteBorderOutlinedIcon onClick={handleLiked} /></p>}
                        {likedPst} likes
                    </div>
                    <div className="item" color='red' onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        {comments?.length} comments
                    </div>
                    <div className="item" color='red'>
                        <BiRepost />
                        Repost Post
                    </div>
                    <div className="item" color='red' style={{ justifySelf: 'flex-end' }}>
                        <BsFillBookmarkFill />
                        Save Post
                    </div>
                </div>
                {commentOpen && <Comments postId={post?.id} />}
            </div>
        </div >
    )
}

export default Post
