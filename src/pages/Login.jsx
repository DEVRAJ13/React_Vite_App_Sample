import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { validate } from '../util/helpers';

export default function Login() {
  const { isAuthenticated, loading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  if (loading) return null;
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valueChecker = validate(email, password);
    setErrors(valueChecker['type'])
    if (!valueChecker['status']) return;
    login();
    navigate('/dashboard');
    setResponse({ "email": email, "password": password });
    setErrors({});
  };

  return (
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