// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    // If no user, redirect to /auth
    if (!user) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};

export default ProtectedRoute;
