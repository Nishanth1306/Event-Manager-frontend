import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        await axios.post(`${import.meta.env.API_URL}/logout`, {}, {
          withCredentials: true,
        });
        localStorage.removeItem('token');
        toast.success('Successfully logged out');
        navigate('/login');
      } catch (error) {
        console.error('Error logging out:', error);
        toast.error('Error logging out. Please try again.');
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
