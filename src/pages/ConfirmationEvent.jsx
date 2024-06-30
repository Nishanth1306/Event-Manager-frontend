import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationEvent = () => {
  const location = useLocation();
  const { otp, eventname } = location.state || {};

  return (
    <div>
      <h1>{`Register for the ${eventname} Successfully`}</h1>
      <h1>{otp ? `Your OTP is ${otp}` : 'Loading...'}</h1>
    </div>
  );
};

export default ConfirmationEvent;
