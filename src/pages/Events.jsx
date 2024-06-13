import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Events = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const fetchUpdatedEvents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching updated events:', error);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      await navigate(`/register/${eventId}`);
      await fetchUpdatedEvents(); 
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const handleDelete = async (eventId) => {
    try { 
      await axios.delete(`${import.meta.env.VITE_API_URL}/${eventId}`);
      await fetchUpdatedEvents(); 
      console.log("Event deleted");
    } catch(error){
      console.error('Error deleting the Event:', error);
    }
  };

  return (
    <div className="events-list">
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <h3>{event.place}</h3>
          <p>Event Name: {event.name}</p>
          <p>Participation Number: {event.participationNumber}</p>
          <p>Duration: {event.duration}</p>
          <p>Address: {event.address}</p>
          <p>StartTime: {event.startTime}</p>
          <p>End TIme: {event.endTime} </p>
          {event.image && <img src={event.image} alt={event.place} />}
          <button onClick={() => handleRegister(event._id)} className='regis-btn'>Register Now</button>
          <button onClick={() => handleDelete(event._id)} className='delete-btn'>Delete</button>
          <p>Remaining Seats Available: {event.participationNumber - event.seatsTaken}</p>
        </div>
      ))}
    </div>
  );
};

export default Events;
