import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterEvent = () => {
  const { eventId, eventName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    seats: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/confirmEvent', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { otp } = response.data;
      toast.success('Your seat has been successfully registered!');
      navigate('/confirmationEvent', { state: { otp, eventname: eventName } });
    } catch (error) {
      console.error('Error registering for event:', error);
      toast.error(`Error registering for the event: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Register for Event</h2>
      <form onSubmit={handleSubmit}>
        <input className='input-form' type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input className='input-form' type="tel" name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
        <input className='input-form' type="number" name="seats" placeholder="Number of Seats" onChange={handleChange} min="1" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterEvent;
