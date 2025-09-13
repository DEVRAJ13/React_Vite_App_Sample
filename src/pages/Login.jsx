import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { validate } from '../util/helpers';
import app_icon from "../assets/app_icon.png";

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
    setErrors(valueChecker['type']);
    if (!valueChecker['status']) return;

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors({ api: data.message || "Login failed" });
        return;
      }

      login(data);
      navigate("/dashboard");
      setResponse(data);
    } catch (error) {
      console.error(error);
      setErrors({ api: "Something went wrong. Try again later." });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-icon">
                <img src={app_icon} alt="AppIcon" />
        </div>
        <h2>Welcome back.</h2>
        <p>Sign in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Username or email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <div className="forgot">
            <span onClick={() => navigate("/forgot-password")}>Forgot password?</span>
          </div>

          <button type="submit" className="login-btn">Sign in</button>

          <div className="register">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Create account</span>
          </div>
        </form>

        {errors.api && <p className="error">{errors.api}</p>}
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>

      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #fff;
        }
        .login-box {
          text-align: center;
          max-width: 360px;
          width: 100%;
        }
        .login-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }
            .login-icon img {
    width: 80px;   /* set your preferred size */
    height: 80px;  /* keep square, or remove if you want auto-height */
    object-fit: contain; /* makes sure it scales nicely */
  }
        h2 {
          font-size: 22px;
          font-weight: 600;
          margin: 0;
        }
        p {
          color: #555;
          margin-bottom: 24px;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        input {
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }
        input:focus {
          border-color: #000;
        }
        .forgot {
          text-align: right;
          font-size: 13px;
          margin-top: -8px;
          margin-bottom: 12px;
        }
        .forgot span {
          cursor: pointer;
          color: #555;
        }
        .login-btn {
          background: #000;
          color: #fff;
          border: none;
          padding: 12px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 15px;
          margin-top: 10px;
        }
        .register {
          font-size: 14px;
          margin-top: 16px;
        }
        .register span {
          color: #000;
          font-weight: 500;
          cursor: pointer;
        }
        .error {
          color: red;
          font-size: 13px;
          text-align: left;
        }
      `}</style>
    </div>
  );
}
