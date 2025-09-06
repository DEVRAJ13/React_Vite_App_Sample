import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { login } = useAuth(); // reuse login() to set user after register
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (password !== confirmPassword) {
            setErrors({ password: "Passwords do not match" });
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({name, email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Registration failed");

            // // Save user in auth context + localStorage
            // login(data);

            setResponse(data);
            setErrors({});
            navigate("/login");
        } catch (err) {
            setErrors({ api: err.message });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
               <div>
                <input
                    type="name"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
            </div>
            <button type="submit">Register</button>
            {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </form>
    );
}
