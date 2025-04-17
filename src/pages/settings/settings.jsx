import React, { useState } from "react";
import { FaUser, FaPalette, FaClock, FaChartLine, FaBell, FaLink } from "react-icons/fa";

import Profile from 'components/settings/Profile';
import Appearance from "components/settings/Appearance";
import Pomodoro from "components/settings/Pomodoro";
import Productivity from "components/settings/Productivity";   
import Notifications from "components/settings/Notifications";   
import Integrations from "components/settings/Integrations";

export default function Settings() {

    const [activeTab, setActiveTab] = useState("profile");
    
    // Render the active tab component
    const renderActiveTab = () => {
        switch(activeTab) {
            case "profile":
                return <Profile />;
            case "appearance":
                return <Appearance />;
            case "pomodoro":
                return <Pomodoro />;
            case "productivity":
                return <Productivity />;
            case "notifications":
                return <Notifications />;
            case "integrations":
                return <Integrations />;
            default:
                return <Profile />;
        }
    };
    
    return (
        <div className="p-6">
            {/* Header section with title, description and back button */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                    <p className="text-gray-600 text-sm">Manage your account settings and preferences.</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Back to Home
                </button>
            </div>
            
            {/* Tab navigation bar */}
            <div className="flex border-b mb-6">
                {/* Profile tab button */}
                <button 
                    className={`flex items-center px-4 py-2 border-b-2 ${
                        activeTab === "profile" 
                            ? "border-blue-500 text-blue-600" 
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("profile")}
                >
                    <FaUser className="mr-2" /> Profile
                </button>

                <button 
                    className={`flex items-center px-4 py-2 border-b-2 ${
                        activeTab === "appearance" 
                            ? "border-blue-500 text-blue-600" 
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("appearance")}
                >
                    <FaPalette className="mr-2" /> Appearance
                </button>

                <button 
                    className={`flex items-center px-4 py-2 border-b-2 ${
                        activeTab === "pomodoro" 
                            ? "border-blue-500 text-blue-600" 
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("pomodoro")}
                >
                    <FaClock className="mr-2" /> Pomodoro
                </button>

                <button 
                    className={`flex items-center px-4 py-2 border-b-2 ${
                        activeTab === "productivity" 
                            ? "border-blue-500 text-blue-600" 
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("productivity")}
                >
                    <FaChartLine className="mr-2" /> Productivity
                </button>

                <button 
                    className={`flex items-center px-4 py-2 border-b-2 ${
                        activeTab === "notifications" 
                            ? "border-blue-500 text-blue-600" 
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("notifications")}
                >
                    <FaBell className="mr-2" /> Notifications
                </button>

                <button 
                    className={`flex items-center px-4 py-2 border-b-2 ${
                        activeTab === "integrations" 
                            ? "border-blue-500 text-blue-600" 
                            : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                    onClick={() => setActiveTab("integrations")}
                >
                    <FaLink className="mr-2" /> Integrations
                </button>
            </div>
            
            {/* Render the active tab component */}
            {renderActiveTab()}
        </div>
    );
}