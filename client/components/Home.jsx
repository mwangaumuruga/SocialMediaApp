import React, { useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import RoadTripTable from './RoadTripTable';



function Home() {
  const vehicleImages = [
    { name: 'Garvey', imageSrc: image4 },
    { name: 'Che Guevara', imageSrc: image1 },
    { name: 'Portmore', imageSrc: image2 },
    { name: 'Lobster', imageSrc: image3 },
  ];

  const recentPlacesImages = [
    { imageSrc: destinationImage1, description: 'Description 1' },
    { imageSrc: destinationImage2, description: 'Description 2' },
    { imageSrc: destinationImage3, description: 'Description 3' },
    { imageSrc: destinationImage4, description: 'Description 4' },
    { imageSrc: destinationImage5, description: 'Description 5' },
    { imageSrc: destinationImage6, description: 'Description 6' },
    { imageSrc: destinationImage7, description: 'Description 7' },
    { imageSrc: destinationImage8, description: 'Description 8' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % recentPlacesImages.length;
    setCurrentImageIndex(nextIndex);
  };

  const handlePreviousImage = () => {
    const previousIndex = (currentImageIndex - 1 + recentPlacesImages.length) % recentPlacesImages.length;
    setCurrentImageIndex(previousIndex);
  };

  return (
    <div className="home-container">
      <div className="title">
        <h1 className="main-title">TEAMTEMBEAKENYA</h1>
        <div className="react-logo-container">
          <img src={reactImage} alt="React" className="react-image" />
        </div>
        <h3 className="subtitle">
          Enjoy Yearly Challenges and get to know your country.
          Join the 'Explore Kenya Challenge' and embark on an affordable year-long journey of Discovery & Adventure In Style
        </h3>
      </div>
      <hr />
      <div className="trips">
        <h2>Upcoming Road Trips</h2>
        <RoadTripTable />
                <div className="booking-form">
          <p>Please sign in to book a trip.</p>
          <Link to="/booking" className="signin-link">BOOK A SLOT</Link>
        </div>
      </div>
      <div className="recent-places-visited">
        <h2>HIGHLIGHTS ON RECENT ROADTRIPS</h2>
        
        <div className="image-gallery">
          <img
            src={recentPlacesImages[currentImageIndex].imageSrc}
            alt={`Destination ${currentImageIndex + 1}`}
            className="gallery-image"
          /><br/>
          <p className="image-description">{recentPlacesImages[currentImageIndex].description}</p>
          <div className="image-navigation">
            <button onClick={handlePreviousImage} className="previous-button">Previous</button>
            <button onClick={handleNextImage} className="next-button">Next</button>
          </div>
        </div>
      </div>
      <div className="vehicles">
        <h2>Vehicle Gallery</h2>
        <div className="gallery-container">
          {vehicleImages.map((vehicle, index) => (
            <div key={index} className="gallery-item">
              <img src={vehicle.imageSrc} alt={vehicle.name} className="gallery-image" />
              <p className="image-name"><strong>{vehicle.name}</strong></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
