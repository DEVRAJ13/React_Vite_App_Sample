import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import './Navbar.css'; // Optional styling file

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
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>MyApp</Link>
      <div>
        {isAuthenticated && <Link to="/dashboard" style={styles.link}>Dashboard</Link>}
        {isAuthenticated && <Link to="/profile" style={styles.link}>Profile</Link>}
        <button onClick={handleAuthClick} style={styles.button}>
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: '#282c34',
    color: '#fff',
  },
  brand: {
    fontSize: '20px',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#61dafb',
  },
  link: {
    marginRight: '15px',
    color: '#fff',
    textDecoration: 'none',
  },
  button: {
    padding: '6px 12px',
    background: '#61dafb',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};
