import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'; 
import '../App.css';

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate(); 

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.API_URL}/login`,
                {
                    email: data.email,
                    password: data.password
                },
                {
                    withCredentials: true
                }
            );

            console.log(response.data.message);
            const token = response.data.token;
            localStorage.setItem('token', token);
            toast.success('Login successful');
            navigate('/Events');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Invalid email or password');
            } else {
                toast.error('Error logging in');
            }
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className='login-container'>
            <h2 className='login-title'>Login</h2>
            <form onSubmit={loginUser} className='login-form'>
                <label className='login-label'>Email</label>
                <input 
                    type='text' 
                    placeholder='Enter your Email' 
                    value={data.email} 
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    className='login-input'
                />
                <label className='login-label'>Password</label>
                <input 
                    type='password' 
                    placeholder='Enter your Password' 
                    value={data.password} 
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    className='login-input'
                />
                <button type='submit' className='login-button'>Login</button>
                <Link to='/forget' className='login-link'>Forget Password</Link>
            </form>
        </div>
    );
}
