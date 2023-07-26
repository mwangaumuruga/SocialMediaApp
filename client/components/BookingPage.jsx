import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingPage() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState('');
  const [selectedTrip, setSelectedTrip] = useState('');
  const [booker, setBooker] = useState('');
  const [ticketsBooked, setTicketsBooked] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8082/trips');
      setBookings(response.data);
    } catch (error) {
      console.log('Error fetching trips:', error);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post('http://localhost:8082/book', {
        userId,
        tripId: selectedTrip,
        booker,
        ticketsBooked,
      });
      console.log('Booking successful:', response.data);
      // Refresh bookings after successful booking
      fetchBookings();
      // Reset form fields
      setUserId('');
      setSelectedTrip('');
      setBooker('');
      setTicketsBooked('');
    } catch (error) {
      console.log('Error booking:', error);
    }
  };

  return (
    <div>
      <h1>Booking Page</h1>

      <h2>Book a Trip</h2>
      <form>
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Trip:
          <select
            value={selectedTrip}
            onChange={(e) => setSelectedTrip(e.target.value)}
          >
            <option value="">Select a Trip</option>
            {bookings.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {trip.destination}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Booker:
          <input
            type="text"
            value={booker}
            onChange={(e) => setBooker(e.target.value)}
          />
        </label>
        <br />
        <label>
          Tickets Booked:
          <input
            type="number"
            value={ticketsBooked}
            onChange={(e) => setTicketsBooked(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleBooking}>
          Book Now
        </button>
      </form>

      <h2>Upcoming Trips</h2>
      <table>
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
          {bookings.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.destination}</td>
              <td>{trip.date}</td>
              <td>{trip.ticketsAvailable}</td>
              <td>{trip.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookingPage;
