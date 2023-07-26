import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoadTripTable from './RoadTripTable';

const AdminPage = () => {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    date: '',
    ticketsAvailable: 0,
    price: '',
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get('http://localhost:8082/trips');
      setTrips(response.data);
    } catch (error) {
      console.log('Error fetching trips:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewTrip((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddTrip = async () => {
    try {
      await axios.post('http://localhost:8082/trips', newTrip);
      setNewTrip({
        destination: '',
        date: '',
        ticketsAvailable: 0,
        price: '',
      });
      fetchTrips();
    } catch (error) {
      console.log('Error adding trip:', error);
    }
  };

  const handleRemoveTrip = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/trips/${id}`);
      fetchTrips();
    } catch (error) {
      console.log('Error removing trip:', error);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <h2>PLANNED TRIPS</h2>
      <RoadTripTable />
      <h3>Add Trip</h3>
      <div>
        <label>Destination:</label>
        <input type="text" name="destination" value={newTrip.destination} onChange={handleInputChange} />
      </div>
      <div>
        <label>Date:</label>
        <input type="text" name="date" value={newTrip.date} onChange={handleInputChange} />
      </div>
      <div>
        <label>Tickets Available:</label>
        <input type="number" name="ticketsAvailable" value={newTrip.ticketsAvailable} onChange={handleInputChange} />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" name="price" value={newTrip.price} onChange={handleInputChange} />
      </div>
      <button onClick={handleAddTrip}>Add Trip</button>

      <h3>Trips</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Tickets Available</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.destination}</td>
              <td>{trip.date}</td>
              <td>{trip.ticketsAvailable}</td>
              <td>{trip.price}</td>
              <td>
                <button onClick={() => handleRemoveTrip(trip.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
