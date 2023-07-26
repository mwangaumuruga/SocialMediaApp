import React, { useEffect, useState } from 'react'
import profile from '../../assets/profile.jpg';
import "./Userprofile.css";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import parklands from '../../assets/MLSA.jpeg';
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getuser, getRelationship, deleteRelationship, createRelationship } from '../../redux/apicall';
import Update from '../../components/update/Update';
const Userprofile = () => {
  const [updateComp, setUpdateComp] = useState(false);
  const id = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const currentuserid = useSelector((state) => state.user?.user?.data?.id);
  const userid = useSelector((state) => state?.user?.currentUser?.user?.id);
  const user = useSelector((state) => state?.user?.currentUser?.user);
  const following = useSelector((state) => state?.relationship?.follow);
  console.log(following, currentuserid, userid);
  useEffect(() => {
    getRelationship(dispatch, userid);
    getuser(dispatch, id);
  }, []);

  const handleFollow = () => {
    //check if user is being followed then unfollow
    if (currentuserid == following) {
      console.log('unfollowed');
      deleteRelationship(dispatch, { followeruserId: currentuserid, followeduserId: userid })
    } else {
      console.log('started following')
      createRelationship(dispatch, { followeruserId: currentuserid, followeduserId: userid })
    }
    //if not following should follow
    //1)pass the followeruserId:currentuse: and followeduserId:userId
  }
  return (
    <div className='userprofile'>
      <div className="images">
        <img src={user?.coverpic} alt="" className='cover' />
        <img src={user?.profilePic} alt="" className='profilePic' />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://instagram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://twitter.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://linkedin.com">
              <LinkedInIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span className='name'>{user?.fullnames}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{user?.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user?.username}</span>
              </div>
            </div>
            {currentuserid === userid ? (<button onClick={() => setUpdateComp(true)}>Update</button>) : <button onClick={handleFollow}>
              {currentuserid == following ? "following" : "follow"}
            </button>}
          </div>
          <div className="right">
            <div>
              <EmailOutlinedIcon />
            </div>
            <div>
              <MoreVertIcon />
            </div>
          </div>
        </div>
      </div>
      {updateComp && <Update setUpdateComp={setUpdateComp} />}
    </div>
  )
}

export default Userprofile