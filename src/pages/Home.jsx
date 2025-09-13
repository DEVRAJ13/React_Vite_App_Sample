// // src/pages/Home.jsx
// import { useAuth } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';

// export default function Home() {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) return null;

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" />;
//   }

//   return <h1>Welcome! Please log in.</h1>;
// }


// src/pages/Home.jsx
import React from 'react';
import './Home.css'; // Import the CSS file

export default function Home() {
  return (
    <div className="home-container">
      <div className="content">
        <div className="logo">
          <img src="https://example.com/your-logo.svg" alt="Logo" />
        </div>
        <h1 className="title">Communicate with smarter AI using Organizational RAG</h1>
        <p className="subheading"> Retrieval-Augmented Generation that connects your org’s knowledge to secure,
      context-aware conversations — easily integrate into your website.</p>
        <div className="download-container">
          <button className="download-btn">Get Started</button>
          <p className="available-text">RAG Widget available for React/Angular or a plain static HTML page.</p>
        </div>
      </div>
    </div>
  );
}
