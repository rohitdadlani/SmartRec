import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthPage.css";

const AuthPage = () => {
    const { setUser } = useContext(AuthContext); // Ensure AuthContext is correctly used
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); // Toggle between login & signup
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/users/login/",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200) {
                const { access, refresh, email, full_name, is_first_login } = response.data;

                // Store tokens & user data
                localStorage.setItem("accessToken", access);
                localStorage.setItem("refreshToken", refresh);
                localStorage.setItem("userData", JSON.stringify({ email, full_name }));

                // Ensure setUser is available before calling
                if (typeof setUser === "function") {
                    setUser({ email, full_name });
                }

                // Navigate to Preferences if first login, otherwise home
                navigate(is_first_login ? "/preferences" : "/");
            }
        } catch (error) {
            setError(error.response?.data?.detail || "Authentication failed. Please try again.");
        }
    };

    // Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/users/register/",
                { email, full_name: fullName, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 201) {
                alert("Signup successful! Please login.");
                setIsLogin(true); // Switch to login after signup
            }
        } catch (error) {
            setError(error.response?.data?.detail || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={isLogin ? handleLogin : handleSignup}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
                </form>

                <p className="switch-mode">
                    {isLogin ? "New user?" : "Already have an account?"}{" "}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Create an account" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
