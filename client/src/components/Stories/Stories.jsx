import React, { useEffect, useState } from 'react'
import storyone from '../../assets/storyone.jpg';
import storytwo from '../../assets/storytwo.jpg';
import storythree from '../../assets/story3.jpg';
import storyfour from '../../assets/curved tv.jpg';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import profile from '../../assets/profile.jpg';
import { getStories } from '../../redux/apicall';
import { useSelector, useDispatch } from 'react-redux';
const Stories = () => {
    const dispatch = useDispatch();
    const stories = useSelector((state) => state?.story?.stories);
    useEffect(() => {
        getStories(dispatch);
    }, [])
    return (
        <div className='stories'>
            {/* <p className='title'>Stories</p>
            <hr style={{ color: "black" }} /> */}
            <div className="story">
                <img src={profile} alt='profile' />
                <span>samkam</span>
                <button style={{ color: "red" }}>+</button>
            </div>
            {
                stories?.map((story) => (
                    <div className="story" key={story.id}>
                        <img src={story.image} alt={story.name} />
                        <span>{story.name}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default Stories
