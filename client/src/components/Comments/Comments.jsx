import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.jpg';
import './Comments.css'
import { getComments, createComment } from '../../redux/apicall';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
const Comments = ({ postId }) => {
    const [description, setdescription] = useState('');
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comment?.comments);
    const profilePic = useSelector((state) => state.user?.user?.data?.profilePic);
    const username = useSelector((state) => state.user?.user?.data?.username);
    const commentuserId = useSelector((state) => state?.user?.user?.data?.id);
    console.log(commentuserId);
    useEffect(() => {
        getComments(dispatch, postId)
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        createComment(dispatch, { description, commentuserId, postId, profilePic, username })
        setdescription("");
    }
    return (
        <div className='comments'>
            <div className='write'>
                <div className='image'>
                    <img src={profilePic} alt="profile pic" />
                </div>
                <form onSubmit={handleSubmit} className="formcomment">
                    <input type="text" placeholder='Share your comment...' value={description} onChange={(e) => setdescription(e.target.value)} required />
                    <button type='submit'>Share</button>
                </form>
            </div>
            {
                comments?.map((comment) => (
                    <div className='comment' key={comment.id}>
                        <img src={comment.profilePic} alt='profile pic' />
                        <div className='info'>
                            <span>{comment.username}</span>
                            <p>{comment.description}</p>
                        </div>
                        <span className='date'>
                            {moment(comment.date).fromNow()}
                        </span>
                    </div>
                ))
            }
        </div>
    )
}

export default Comments
