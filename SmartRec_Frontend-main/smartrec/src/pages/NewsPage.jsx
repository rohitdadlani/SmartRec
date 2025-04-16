import React, { useState, useEffect } from "react";
import "../styles/NewsPage.css"; // We'll define .news-grid etc. here

function NewsPage() {
    const [articles, setArticles] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/news/");
                // or your actual endpoint
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setArticles(data); // data should be an array of articles
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="news-page">
            <h1 className="news-heading">Today's Breaking News</h1>

            <div className="news-grid">
                {/* Render articles in a 2×2 grid */}
                {articles.map((item) => (
                    <div className="news-tile" key={item.id}>
                        {/* Left: Circular image */}
                        <img
                            src={item.url_to_image}
                            alt={item.title}
                            className="news-image"
                        />

                        {/* Center: Title & snippet */}
                        <div className="news-info">
                            <h2 className="news-title">{item.title}</h2>
                            <p className="news-snippet">
                                {item.content?.slice(0, 80)}...
                            </p>
                        </div>

                        {/* Right: Button */}
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="news-button"
                        >
                            Read More
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsPage;
