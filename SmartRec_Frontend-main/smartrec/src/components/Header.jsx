import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <Link to="/" className="logo">SmartRec</Link>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/news">Explore News</Link></li>
                    <li><Link to="/events">Explore Events</Link></li>
                    {user ? (
                        <li className="user-info">
                            <span>Welcome, <strong>{user.full_name || "User"}</strong></span>
                            <button onClick={logout}>Logout</button>
                        </li>
                    ) : (
                        <li><Link to="/auth">Login/Signup</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
