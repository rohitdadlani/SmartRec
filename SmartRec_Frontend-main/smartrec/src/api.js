import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/news/"; // Local backend endpoint

export const getArticles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // This should be the array of articles
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};
