import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the CSS file
import App from './App.jsx';
import { AuthProvider } from './lib/AuthContext.jsx';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();