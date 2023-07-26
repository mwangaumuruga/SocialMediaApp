import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/Avatar.png';
import './MyProfile.css';

// Import FontAwesomeIcon and the required icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faBell, faImages, faUsers } from '@fortawesome/free-solid-svg-icons';

function MyProfile() {
  // Dummy user data for demonstration purposes
  const user = {
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'johndoe@example.com',
  };

  return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            src={avatar}
            alt="Home"
          />
        </div>
        <div style={{ marginLeft: '20px' }}>
       
          {/* Add the FontAwesomeIcon and icons here */}
          <div className="icon-item">
            <FontAwesomeIcon icon={faUserFriends} />
            <span>50k Followers</span>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faBell} />
            <span>2 Notifications</span>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faImages} />
            <span>5k Posts</span>
          </div>
          <div className="icon-item">
            <FontAwesomeIcon icon={faUsers} />
            <span>2k Friends</span>
          </div>
        <div style={{ marginLeft: '20px' }}>

        <Link to="/contacts" className="header-link">NOTIFICATIONS</Link>
      <Link to="/booking" className="header-link">FRIENDS</Link>
      <Link to="/admin" className="header-link">MESSAGES</Link>
     
      
          <h1>YOUR PERSONAL PROFILE</h1>
          <table>
            <tr>
              <th>Personal Information</th>
              <th></th>
            </tr>
            <tr>
              <td>Name:</td>
              <td>John Doe</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>30</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>johndoe@example.com</td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>New York, USA</td>
            </tr>
          </table>
          <table>
            <tr>
              <th>Education</th>
              <th></th>
            </tr>
            <tr>
              <td>University:</td>
              <td>Example University</td>
            </tr>
            <tr>
              <td>Degree:</td>
              <td>Bachelor of Science in Computer Science</td>
            </tr>
            <tr>
              <td>Year of Graduation:</td>
              <td>2021</td>
            </tr>
          </table>
          <table>
            <tr>
              <th>Work Experience</th>
              <th></th>
            </tr>
            <tr>
              <td>Company:</td>
              <td>ABC Tech Solutions</td>
            </tr>
            <tr>
              <td>Position:</td>
              <td>Software Engineer</td>
            </tr>
            <tr>
              <td>Duration:</td>
              <td>2019 - Present</td>
            </tr>
          </table>

        </div>
      </div>
    </div>
  );
}

export default MyProfile;
