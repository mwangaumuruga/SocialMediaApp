import React, { useState, useEffect } from 'react'
import './Home.css'
import storyone from '../../assets/storyone.jpg';
import storytwo from '../../assets/storytwo.jpg';
import storythree from '../../assets/story3.jpg';
import storyfour from '../../assets/curved tv.jpg';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Stories from '../../components/Stories/Stories';
import Posts from '../../components/Posts/Posts';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import '../../firebase'
import { createStory } from '../../redux/apicall';
import { useSelector, useDispatch } from 'react-redux';
import CreatePost from '../CreatePost';
const Home = () => {
  const [file, setFile] = useState(null);
  const state = useSelector((state) => state?.user?.user);
  const storyuserId = state?.data?.id;
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    console.log(file);
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage();
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((image) => {
          console.log('File available at', image);
          createStory(dispatch, { storyuserId, image });
        });
      }
    );
    // createStory(dispatch, { id, photos });
    setFile(null);
  }
  return (
    <div className='home'>
      <Stories />
      <div className='createStory'>
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <input type='file' id='file' onChange={(e) => setFile(e.target.files[0])} required />
          <label htmlFor=""><button style={{ color: "red", margin: "auto", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", alignItems: "center" }} type='submit'>Add</button></label>
          {file && <img className='file' alt='' src={URL.createObjectURL(file)} height="40px" width="40px" style={{ objectfit: "cover" }} />}
        </form>
        {/* <p>Create Story</p> */}
      </div>
      <CreatePost />
      <Posts />
    </div>
  )
}

export default Home