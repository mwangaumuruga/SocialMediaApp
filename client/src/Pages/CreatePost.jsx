import React, { useState, useEffect } from 'react'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    uploadBytes,
    getDownloadURL,
} from "firebase/storage";
import '../firebase'
import { useSelector, useDispatch } from 'react-redux';
import './createPost.css'
import { BsImage, BsPeopleFill } from 'react-icons/bs';
import { MdPlace } from 'react-icons/md';
import { createPost } from '../redux/apicall';
const CreatePost = () => {
    const [postfile, setpostFile] = useState(null);
    const [description, setDescription] = useState('');
    const state = useSelector((state) => state?.user?.user);
    const userId = state?.data?.id;
    const profile = useSelector((state) => state.user?.user?.data?.profilePic);
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(postfile, description);
        const fileName = new Date().getTime() + postfile.name;
        const storage = getStorage();
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, postfile);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((image) => {
                    console.log('File available at', image);
                    createPost(dispatch, { userId, image, description })
                });
            }
        );
        setpostFile(null);
        setDescription("");
    }
    return (
        <div className='createPost'>
            <form onSubmit={handleSubmit}>
                <div className='top'>
                    <div className="left">
                        <img src={profile} alt="" />
                        <input type='text' placeholder='Create a post' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='right'>
                        {postfile && <img className='file' alt='' src={URL.createObjectURL(postfile)} height="40px" width="40px" style={{ objectfit: "cover" }} />}
                    </div>
                </div>
                <div className='bottom'>
                    <div className='left'>
                        <input type='file' id='file' onChange={(e) => setpostFile(e.target.files[0])} required />
                        <label htmlFor='file'>
                            <div className="item">
                                <BsImage />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <MdPlace />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <BsPeopleFill />
                            <span>Tag Friends</span>
                        </div>
                        <button type='submit'>Share</button>
                    </div>
                    {/* <div className='right' id='share'>
                        <button type='submit'>Share</button>
                    </div> */}
                </div>
            </form>
        </div>
    )
}

export default CreatePost
