import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // const handleLogin = () => {
  //   login();
  //   navigate('/dashboard');
  // };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;
    console.log(email)
    console.log(password)
    // try {
    //   const res = await axios.post('https://your-api.com/login', {
    //     email,
    //     password,
    //   });
    //   setResponse(res.data); // You can handle token or success here
    // } catch (err) {
    //   console.error(err);
    //   setResponse({ error: 'Login failed' });
    // }
    login();
    navigate('/dashboard');
    setResponse({"email":email, "password":password });
    setErrors({});
  };

  return (
    // <div>
    //   <h1>Login Page</h1>
    //   <button onClick={handleLogin}>Log In</button>
    // </div>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </form>
  );
}