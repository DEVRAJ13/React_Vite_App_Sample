import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setResponse(data);
      setErrors({});
      navigate("/login");
    } catch (err) {
      setErrors({ api: err.message });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-icons">🐑 🐑 🐑 🐑</div>
        <h2>Create an account to publish<br />and share models.</h2>

        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" className="register-btn">
            Create account
          </button>

          <div className="login-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log in</span>
          </div>
        </form>

        {errors.api && <p className="error">{errors.api}</p>}
        {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
      </div>

      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #fff;
        }
        .register-box {
          text-align: center;
          max-width: 360px;
          width: 100%;
        }
        .register-icons {
          font-size: 32px;
          margin-bottom: 16px;
        }
        h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
          line-height: 1.4;
        }
        .register-form {
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
        .register-btn {
          background: #000;
          color: #fff;
          border: none;
          padding: 12px;
          border-radius: 25px;
          cursor: pointer;
          font-size: 15px;
          margin-top: 12px;
        }
        .login-link {
          font-size: 14px;
          margin-top: 16px;
        }
        .login-link span {
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



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Register() {
//     const { login } = useAuth(); // reuse login() to set user after register
//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [name, setUserName] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [errors, setErrors] = useState({});
//     const [response, setResponse] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         // Basic validation
//         if (password !== confirmPassword) {
//             setErrors({ password: "Passwords do not match" });
//             return;
//         }

//         try {
//             const res = await fetch("http://localhost:3000/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({name, email, password }),
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message || "Registration failed");

//             // // Save user in auth context + localStorage
//             // login(data);

//             setResponse(data);
//             setErrors({});
//             navigate("/login");
//         } catch (err) {
//             setErrors({ api: err.message });
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Register</h2>
//                <div>
//                 <input
//                     type="name"
//                     placeholder="User Name"
//                     value={name}
//                     onChange={(e) => setUserName(e.target.value)}
//                     required
//                 />
//                 {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
//             </div>
//             <div>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
//             </div>
//             <div>
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </div>
//             <div>
//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                 />
//                 {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
//             </div>
//             <button type="submit">Register</button>
//             {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}
//             {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
//         </form>
//     );
// }
