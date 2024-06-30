import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css'; 

export default function Register() {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, {
                name: data.name,
                email: data.email,
                password: data.password
            });
            toast.success("User registered successfully!");
            setData({ name: '', email: '', password: '' });
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error("Error registering user. Please try again.");
        }
    };

    return (
        <div className='register-container'>
            <h2 className='register-title'>Register</h2>
            <form onSubmit={handleRegister} className='register-form'>
                <div className='register-input-container'>
                    <label className='register-label'>Name:</label>
                    <input
                        type='text'
                        placeholder='Enter your Name'
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        className='input-form'
                        required
                    />
                </div>
                <div className='register-input-container'>
                    <label className='register-label'>Email:</label>
                    <input
                        type='email'
                        placeholder='Enter your Email'
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className='input-form'
                        required
                    />
                </div>
                <div className='register-input-container'>
                    <label className='register-label'>Password:</label>
                    <input
                        type='password'
                        placeholder='Enter your Password'
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        className='input-form'
                        required
                    />
                </div>
                <button type='submit' className='register-button'>Register</button>
            </form>
            <ToastContainer />
        </div>
    );
}
