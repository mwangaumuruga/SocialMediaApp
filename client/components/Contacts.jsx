import React from 'react';
import './Contacts.css';

function Contacts() {
  return (
    <div className="contacts-container">
      <h2 className="contacts-title">Contacts Page</h2>
      <p>REACH US THROUGH:</p>
      <ul>
        <li>Email: kanambodede@gmail.com</li>
        <li>Phone: 123-456-7890</li>
        <li>Address: 123 Main St Kanairo</li>
      </ul>
      <div className="social-media">
        <h3>Follow us on social media:</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com">Facebook</a>
          </li>
          <li>
            <a href="https://www.twitter.com">Twitter</a>
          </li>
          <li>
            <a href="https://www.instagram.com">Instagram</a>
          </li>
          <li>
            <a href="https://www.linkedin.com">LinkedIn</a>
          </li>
          <li>
            <a href="https://www.youtube.com">YouTube</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Contacts;
