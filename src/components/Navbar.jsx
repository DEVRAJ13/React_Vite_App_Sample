

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';
import logo from "../assets/logo.png";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="header">
      <div className="logo">
          <img src={logo} alt="Logo"/>
      </div>
      <nav className="nav-links">
        <ul>
          {isAuthenticated && <li><NavLink to="/dashboard"
      className={({ isActive }) => (isActive ? "active-link" : "")}>Dashboard</NavLink></li>}
          {isAuthenticated && <li><NavLink to="/profile"
      className={({ isActive }) => (isActive ? "active-link" : "")}>Profile</NavLink></li>}
        </ul>
      </nav>
      <div className="search-and-buttons">
        {/* <input type="text" className="search-input" placeholder="Search models" /> */}
        <div className="auth-buttons">
          {/* <button className="sign-in-btn">Sign in</button> */}
          <button className="sign-in-btn" onClick={handleAuthClick}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
          {/* <button className="download-btn">Download</button> */}
        </div>
      </div>
    </header>
  );
}
