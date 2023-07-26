import React, { useState, useEffect } from 'react'
import profile from '../../assets/profile.jpg';
import postone from '../../assets/sroryone.jpg';
import twinnie from '../../assets/twinnie.jpg';
import Post from '../Post/Post';
import './Posts.css';
import { useQuery } from 'react-query';
import { getPosts } from '../../redux/apicall';
import { useDispatch, useSelector } from 'react-redux';
const Posts = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state?.user?.user);
    const postdata = useSelector((state) => state?.post?.posts);
    useEffect(() => {
        getPosts(dispatch, token);
    }, [])
    return (
        <div className='posts'>
            {
                postdata?.map((post) => (
                    <Post post={post} key={post?.id} />
                ))
            }

        </div>



    )
}

export default Posts
