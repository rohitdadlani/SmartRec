import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/Profile.css";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="profile-container">
            <h2>Account Details</h2>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>

            <h3>Manage Account</h3>
            <button>Change Password</button>
            <button>Manage Bookmarks</button>
            <button>View Liked News/Events</button>
        </div>
    );
};

export default ProfilePage;
