import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    place: '',
    eventname:'',
    participationNumber: '',
    duration: '',
    address: '',
    image: '',
    startTime: '',
    endTime: '',
  });
  const navigate = useNavigate();

  // ${import.meta.env.VITE_API_URL}/events
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };
    if (!dataToSend.image) {
      delete dataToSend.image;
    }

    console.log('Data to send:', dataToSend);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/events`, dataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`);
      setEvents(response.data);
      setFormData({
        place: '',
        eventname:'',
        participationNumber: '',
        duration: '',
        address: '',
        image: '',
        startTime: '',
        endTime: '',
      });
    } catch (error) {
      console.error('Error uploading event:', error);
    }
  };

  return (
    <div className="events-container">
      <h2>Events</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="place"
          placeholder="Place"
          value={formData.place}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="eventname"
          placeholder="EventName"
          value={formData.eventname}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="participationNumber"
          placeholder="Participation Number"
          value={formData.participationNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="startTime"
          placeholder="Start Time"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="endTime"
          placeholder="End Time"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" onChange={handleChange} />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default Events;
