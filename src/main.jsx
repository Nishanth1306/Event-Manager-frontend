import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

// Assuming you have an element with id 'root' in your index.html
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
