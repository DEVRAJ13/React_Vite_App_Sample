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

    try {
      // Call your login API
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        setErrors({ api: data.message || "Login failed" });
        return;
      }

      // save user/token in your auth context
      login(data); // assuming login() in AuthContext handles token/user
      navigate("/dashboard");
      setResponse(data);
      // setErrors({});
    } catch (error) {
      console.error(error);
      setErrors({ api: "Something went wrong. Try again later." });
    }
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

         <button
        type="button"
        onClick={() => navigate("/register")}
        style={{ marginLeft: "10px" }}
      >
        Register
      </button>
          {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}
      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </form>
  );
}