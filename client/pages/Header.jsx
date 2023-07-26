import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <Link to="/" className="header-link">GETSTARTED</Link>
      <Link to="/http://localhost/sns/user/" className="header-link">FEEDS</Link>

     
      <hr />
    </div>
  );
}

export default Header;
