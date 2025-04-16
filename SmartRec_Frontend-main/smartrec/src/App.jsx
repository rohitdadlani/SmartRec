import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute"; // The optional file above

// Pages
import LandingPage from "./pages/LandingPage";
import PreferencesPage from "./pages/PreferencesPage";
import NewsPage from "./pages/NewsPage";
import EventsPage from "./pages/EventsPage";
import AuthPage from "./pages/AuthPage";


// Global Styles (optional, if you want to fix layout with footer at bottom)
import "./index.css"; // e.g. with flex layout for #root

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                {/* Main content container -> pushes footer down if you have flex layout */}
                <div className="main-content">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/events" element={<EventsPage />} />

                        {/* Protected Route: PreferencesPage */}
                        <Route
                            path="/preferences"
                            element={
                                <ProtectedRoute>
                                    <PreferencesPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
