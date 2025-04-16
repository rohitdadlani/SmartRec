import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("access") || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refresh") || null);

    // Fetch user profile after login or refresh
    const fetchUserProfile = async (token) => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("Fetched User Profile:", response.data); // Debugging
            setUser(response.data); // Ensure `full_name` is stored

            // ✅ Store user in localStorage to persist across refresh
            localStorage.setItem("userData", JSON.stringify(response.data));
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            logout();
        }
    };

    // Login Function
    const login = async (email, password) => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/login/", {
                email,
                password
            });

            const { access, refresh } = response.data;

            // Store tokens
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            setAccessToken(access);
            setRefreshToken(refresh);

            // Fetch user details
            await fetchUserProfile(access);
            return true;
        } catch (error) {
            console.error("Login failed", error);
            return false;
        }
    };

    // Function to refresh access token
    const refreshAccessToken = async () => {
        if (!refreshToken) return null;

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/users/refresh/", {
                refresh: refreshToken
            });

            const newAccessToken = response.data.access;
            localStorage.setItem("access", newAccessToken);
            setAccessToken(newAccessToken);

            // ✅ Fetch user profile again after token refresh
            await fetchUserProfile(newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("Token refresh failed", error);
            logout();
            return null;
        }
    };

    // Logout Function
    const logout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("userData");
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    // Fetch user profile on page load if token exists
    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Restore user from localStorage
        }
        if (accessToken) {
            fetchUserProfile(accessToken);
        }
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
