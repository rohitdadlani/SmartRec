import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/PreferencesPage.css";

const PreferencesPage = () => {
    const { markHasPrefs } = useContext(AuthContext);
    const [selected, setSelected] = useState([]);

    const prefs = ["Sports", "Business", "Technology", "Health"];

    const togglePref = (pref) => {
        if (selected.includes(pref)) {
            setSelected(selected.filter((p) => p !== pref));
        } else {
            setSelected([...selected, pref]);
        }
    };

    const handleSave = () => {
        // Normally, you might save to an API or localStorage
        alert(`Saved preferences: ${selected.join(", ")}`);
        markHasPrefs(); // Mark the user as having selected prefs
    };

    return (
        <div className="prefs-container">
            <h2>Select Your Preferences</h2>
            <div className="prefs-list">
                {prefs.map((p) => (
                    <label key={p}>
                        <input
                            type="checkbox"
                            checked={selected.includes(p)}
                            onChange={() => togglePref(p)}
                        />
                        {p}
                    </label>
                ))}
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default PreferencesPage;
