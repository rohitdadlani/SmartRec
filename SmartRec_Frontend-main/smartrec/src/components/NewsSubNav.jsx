import React from "react";
import { Link } from "react-router-dom";
import "../styles/NewsSubNav.css";

const NewsSubNav = () => {
    return (
        <div className="news-subnav">
            <ul>
                <li><Link to="/news/us">U.S.</Link></li>
                <li><Link to="/news/world">World</Link></li>
                <li><Link to="/news/business">Business</Link></li>
                <li><Link to="/news/arts">Arts</Link></li>
                <li><Link to="/news/lifestyle">Lifestyle</Link></li>
                <li><Link to="/news/opinion">Opinion</Link></li>
                <li><Link to="/news/audio">Audio</Link></li>
                <li><Link to="/news/games">Games</Link></li>
                <li><Link to="/news/cooking">Cooking</Link></li>
                <li><Link to="/news/wirecutter">Wirecutter</Link></li>
                <li><Link to="/news/theathletic">The Athletic</Link></li>
            </ul>
        </div>
    );
};

export default NewsSubNav;
