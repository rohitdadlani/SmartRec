import React from "react";
import "../styles/EventsSubNav.css";

const EventsSubNav = () => {
    return (
        <div className="events-subnav">
            <ul>
                <li><a href="#">Tech</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">Music</a></li>
                <li><a href="#">Art</a></li>
                <li><a href="#">Sports</a></li>
                <li><a href="#">Education</a></li>
                <li><a href="#">Health</a></li>
            </ul>
        </div>
    );
};

export default EventsSubNav;
