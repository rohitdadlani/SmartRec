import React from "react";
import EventsSubNav from "../components/EventsSubNav";
import "../styles/EventsPage.css";

const upcomingEvents = [
    {
        title: "Tech Conference 2025",
        description: "Join top tech leaders in Silicon Valley for the latest trends.",
        image: "https://via.placeholder.com/50",
        link: "#",
    },
    {
        title: "AI Innovation Summit",
        description: "Discover the future of AI at this international summit.",
        image: "https://via.placeholder.com/50",
        link: "#",
    },
    {
        title: "Music Festival 2025",
        description: "Enjoy live performances from top artists in this grand event.",
        image: "https://via.placeholder.com/50",
        link: "#",
    },
];

const otherEvents = [
    {
        title: "Startup Pitch Night",
        description: "A platform for entrepreneurs to showcase their startups.",
        image: "https://via.placeholder.com/50",
        link: "#",
    },
    {
        title: "Blockchain Expo",
        description: "Explore the latest advancements in blockchain technology.",
        image: "https://via.placeholder.com/50",
        link: "#",
    },
    {
        title: "Photography Workshop",
        description: "Learn photography techniques from industry experts.",
        image: "https://via.placeholder.com/50",
        link: "#",
    },
];

const EventsPage = () => {
    return (
        <div>
            <EventsSubNav />
            <div className="events-container">
                <h1>Upcoming Events</h1>
                <div className="events-grid">
                    {upcomingEvents.map((event, index) => (
                        <div className="event-card" key={index}>
                            <img src={event.image} alt={event.title} />
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                            <a href={event.link} className="read-more">More Info</a>
                        </div>
                    ))}
                </div>

                {/* New Section: Other Events */}
                <h2>Other Events</h2>
                <div className="events-grid">
                    {otherEvents.map((event, index) => (
                        <div className="event-card small" key={index}>
                            <img src={event.image} alt={event.title} />
                            <h4>{event.title}</h4>
                            <p>{event.description}</p>
                            <a href={event.link} className="read-more">More Info</a>
                        </div>
                    ))}
                </div>

                {/* Explore More Events */}
                <div className="explore-more">
                    <button className="view-more">View More Events</button>
                </div>
            </div>
        </div>
    );
};

export default EventsPage;
