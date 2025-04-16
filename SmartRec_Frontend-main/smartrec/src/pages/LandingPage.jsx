import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css"; // Import styles

const LandingPage = () => {
    return (
        <div className="landing-container">
            <div className="welcome-section">
                <h1>Hello User! Navigate to your personalized News and Events</h1>
            </div>

            <div className="navigation-buttons">
                <Link to="/news" className="nav-button">Explore News</Link>
                <Link to="/events" className="nav-button">Explore Events</Link>
                <Link to="/trending" className="nav-button">See What’s Trending Today</Link>
            </div>
        </div>
    );
};

export default LandingPage;
