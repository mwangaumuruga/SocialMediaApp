import React from 'react';
import start from '../assets/home.png';
import { Link } from 'react-router-dom';
import './Onboarding.css';

function Onboarding() {
  return (
    <div className="onboarding-container">
      <div className="onboarding-image">
        <img src={start} alt="Home" />
      </div>
      <h1 className="onboarding-heading">Let's connect with each other</h1>
      <h3>Capture and share the highlights of your life with your friends and family</h3>
      <Link to="/login" className="onboarding-button">Let's Get Started</Link>
    </div>
  );
}

export default Onboarding;
