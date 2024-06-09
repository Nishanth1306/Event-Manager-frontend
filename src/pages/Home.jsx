import React from 'react';
import downloadImage from '../assets/home.jpg'; 

export default function Home() {
  return (
    <div>
      <h1>Welcome to Event Maker's</h1>
      <img src={downloadImage} alt="Shopping Mart" className='img'></img>
      <h1>We Bring Events to Your Hands</h1>
    </div>
  );
}
