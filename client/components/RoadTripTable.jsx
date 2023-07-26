import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoadTripTable = () => {
  const [roadTripData, setRoadTripData] = useState([]);

  useEffect(() => {
    fetchRoadTripData();
  }, []);

  const fetchRoadTripData = async () => {
    try {
      const response = await axios.get('http://localhost:8082/trips');
      setRoadTripData(response.data);
    } catch (error) {
      console.log('Error fetching road trip data:', error);
    }
  };

  return (
    <div>
     
      {roadTripData.length > 0 ? (
        <table className="road-trip-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Tickets Available</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {roadTripData.map((trip) => (
              <tr key={trip.ID}>
                <td>{trip.ID}</td>
                <td>{trip.Destination}</td>
                <td>{trip.Date}</td>
                <td>{trip.TicketsAvailable}</td>
                <td>{trip.Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Please sign in to book a trip.</p>
      )}

    </div>
  );
};

export default RoadTripTable;
