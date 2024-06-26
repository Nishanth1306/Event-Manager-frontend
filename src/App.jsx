import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Forget from './pages/Forget';
import Logout from './pages/Logout';
import AddEvent from './pages/AddEvent';
import Events from './pages/Events';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterEvent from './pages/RegisterEvent';
import Home from './pages/Home';
import ConfirmationEvent from './pages/ConfirmationEvent';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/add-event" element={<ProtectedRoute element={<AddEvent />} />} />
        <Route path="/events" element={<ProtectedRoute element={<Events />} />} />
        <Route path="/register/:eventId/:eventName" element={<RegisterEvent />} />
        <Route path="/confirmationEvent" element={<ConfirmationEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
