import React, { useState, useEffect } from 'react';
import './update.css';
import { BsCloudUpload } from 'react-icons/bs'
import { BiHomeAlt } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux';
import { updatedUser } from '../../redux/apicall';
const Update = ({ setUpdateComp }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user?.user?.data);
    console.log(user?.city)
    const [cover, setCover] = useState(`${user.coverpic}`);
    const [profile, setProfile] = useState(`${user.profilePic}`);
    const [email, setEmail] = useState(`${user.email}`);
    const [password, setPassword] = useState('password');
    const [username, setUsername] = useState(`${user.username}`);
    const [fullnames, setfullnames] = useState(`${user.fullnames}`);
    const [city, setCity] = useState(`${user.city}`);
    const [website, setwebsite] = useState(`${user.website}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        updatedUser(dispatch, user, { coverpic: cover, profilePic: profile, email, password, username, fullnames, city, website });
    }
    return (
        <div className='update'>
            <div className='wrapper'>
                <h1 style={{ textAlign: "center" }}>Update Profile</h1>
                <span onClick={() => setUpdateComp(false)} className="close">X</span>
                <form onSubmit={handleSubmit}>
                    <div className='files'>
                        <div className='inputsFields'>
                            <div>
                                <label htmlFor="coverpic">
                                    <span>Cover Picture</span>
                                    <div className='imageContainer'>
                                        {`${user.coverpic}` && <img className='file' alt='' src={`${user.coverpic}`} height="40px" width="40px" style={{ objectfit: "cover" }} />}
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="cover"
                                    style={{ display: "flex" }}
                                    placeholder='enter cover pic'
                                    onChange={(e) => setCover(e.target.files[0])}
                                />
                                {/* {cover && <img className='file' alt='' src={URL.createObjectURL(cover)} height="40px" width="40px" style={{ objectfit: "cover" }} />} */}
                            </div>
                            <div>
                                <label htmlFor="profile">
                                    <span>Profile Picture</span>
                                    <div className="imgContainer">
                                        {`${user.profilePic}` && <img className='file' alt='' src={`${user.profilePic}`} height="40px" width="40px" style={{ objectfit: "cover" }} />}
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="profile"
                                    style={{ display: "flex" }}
                                    placeholder="uplaod profile pic"
                                    onChange={(e) => setProfile(e.target.files[0])}
                                />
                                {/* {profile && <img className='file' alt='' src={URL.createObjectURL(profile)} height="40px" width="40px" style={{ objectfit: "cover" }} />} */}
                            </div>
                        </div>
                        <div className='inputsFields'>
                            <div>
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    name="email"
                                    placeholder='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>User Name</label>
                                <input
                                    type="text"
                                    value={username}
                                    name="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='inputsFields'>
                            <div>
                                <label>Full Names</label>
                                <input
                                    type="text"
                                    value={fullnames}
                                    name="fullnames"
                                    onChange={(e) => setfullnames(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>City</label>
                                <input
                                    type="text"
                                    value={city}
                                    name="city"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Website</label>
                                <input
                                    type="text"
                                    value={website}
                                    name="website"
                                    onChange={(e) => setwebsite(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Update
