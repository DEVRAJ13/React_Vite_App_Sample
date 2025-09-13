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
        <div className="login-icon">🐑</div>
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



// // Import hooks and utilities used in this component
// import { useAuth } from '../context/AuthContext'; 
// // useAuth is a custom hook from AuthContext. It provides authentication state 
// // (like isAuthenticated, loading) and actions (like login).

// import { useNavigate, Navigate } from 'react-router-dom'; 
// // useNavigate → lets us programmatically redirect the user.
// // Navigate → component to conditionally redirect if already logged in.

// import { useState } from 'react'; 
// // useState → React hook to manage local component state.

// import { validate } from '../util/helpers'; 
// // validate → custom helper function to check email/password input 
// // and return errors or status.


// export default function Login() {
//   // 1. Get authentication values and functions from context
//   const { isAuthenticated, loading, login } = useAuth();

//   // 2. Create navigation helper
//   const navigate = useNavigate();

//   // 3. Local state to store form inputs and responses
//   const [email, setEmail] = useState('');       // user email input
//   const [password, setPassword] = useState(''); // user password input
//   const [errors, setErrors] = useState({});     // store validation/API errors
//   const [response, setResponse] = useState(null); // store successful API response


//   // --- Conditional rendering before form loads ---
//   if (loading) return null;  
//   // If authentication status is still loading, show nothing (could also show a spinner).

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" />;  
//     // If already logged in, redirect user straight to dashboard.
//   }


//   // --- Form submit handler ---
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // prevent default form reload

//     // 1. Validate user input
//     const valueChecker = validate(email, password);
//     setErrors(valueChecker['type']); // store any input-specific error messages
//     if (!valueChecker['status']) return; // stop if validation fails

//     try {
//       // 2. Call backend login API
//       const res = await fetch("http://localhost:3000/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" }, // sending JSON body
//         body: JSON.stringify({ email, password }), // include form data
//       });

//       // 3. Convert response into JSON
//       const data = await res.json();
//       console.log(data);

//       // 4. Handle unsuccessful login
//       if (!res.ok) {
//         setErrors({ api: data.message || "Login failed" });
//         return;
//       }

//       // 5. Handle successful login
//       login(data); // use context login() → saves token/user globally
//       navigate("/dashboard"); // redirect user to dashboard
//       setResponse(data); // also save API response for debugging or display
//       // setErrors({}); // (optional) clear errors on success
//     } catch (error) {
//       // 6. Catch unexpected errors (network/server)
//       console.error(error);
//       setErrors({ api: "Something went wrong. Try again later." });
//     }
//   };


//   // --- Component UI ---
//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>

//       {/* Email input field */}
//       <div>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)} // update email state
//           required
//         />
//         {/* Show validation error if present */}
//         {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//       </div>

//       {/* Password input field */}
//       <div>
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)} // update password state
//           required
//         />
//         {/* Show validation error if present */}
//         {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
//       </div>

//       {/* Login button */}
//       <button type="submit">Login</button>

//       {/* Register button → navigate to registration page */}
//       <button
//         type="button"
//         onClick={() => navigate("/register")}
//         style={{ marginLeft: "10px" }}
//       >
//         Register
//       </button>

//       {/* Show API error message if login failed */}
//       {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}

//       {/* Show full API response (useful for debugging) */}
//       {response && (
//         <pre>{JSON.stringify(response, null, 2)}</pre>
//       )}
//     </form>
//   );
// }
