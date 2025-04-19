// src/pages/settings/settings.jsx
import React, { useState } from "react";
import { FaUser, FaPalette, FaClock, FaChartLine, FaBell, FaLink } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

// Import your components
import Profile from '../../components/settings/Profile';
import Appearance from "../../components/settings/Appearance";
import Pomodoro from "../../components/settings/Pomodoro";
import Productivity from "../../components/settings/Productivity";   
import Notifications from "../../components/settings/Notifications";   
import Integrations from "../../components/settings/Integrations";

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");
    const { isDark, setTheme } = useTheme();
    
    // Handle theme change from Appearance component
    const handleThemeChange = (theme) => {
        setTheme(theme);
    };
    
    // Render the active tab component
    const renderActiveTab = () => {
        switch(activeTab) {
            case "profile":
                return <Profile />;
            case "appearance":
                return <Appearance onThemeChange={handleThemeChange} />;
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
        <div className="flex flex-col h-screen">
            {/* Main header */}
            <header className={`flex items-center h-16 px-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800 border-b border-gray-200'}`}>
                <h1 className="text-xl font-bold">Settings</h1>
            </header>

            {/* Main content area */}
            <div className={`flex-1 overflow-auto ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`}>
                {/* Tab navigation bar */}
                <div className={`flex ${isDark ? 'border-b border-gray-700' : 'border-b border-gray-200'} px-6`}>
                    <button 
                        className={`flex items-center px-4 py-3 border-b-2 ${
                            activeTab === "profile" 
                                ? "border-blue-500 text-blue-500" 
                                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <FaUser className="mr-2" /> Profile
                    </button>

                    <button 
                        className={`flex items-center px-4 py-3 border-b-2 ${
                            activeTab === "appearance" 
                                ? "border-blue-500 text-blue-500" 
                                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`}
                        onClick={() => setActiveTab("appearance")}
                    >
                        <FaPalette className="mr-2" /> Appearance
                    </button>

                    <button 
                        className={`flex items-center px-4 py-3 border-b-2 ${
                            activeTab === "pomodoro" 
                                ? "border-blue-500 text-blue-500" 
                                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`}
                        onClick={() => setActiveTab("pomodoro")}
                    >
                        <FaClock className="mr-2" /> Pomodoro
                    </button>

                    <button 
                        className={`flex items-center px-4 py-3 border-b-2 ${
                            activeTab === "productivity" 
                                ? "border-blue-500 text-blue-500" 
                                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`}
                        onClick={() => setActiveTab("productivity")}
                    >
                        <FaChartLine className="mr-2" /> Productivity
                    </button>

                    <button 
                        className={`flex items-center px-4 py-3 border-b-2 ${
                            activeTab === "notifications" 
                                ? "border-blue-500 text-blue-500" 
                                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`}
                        onClick={() => setActiveTab("notifications")}
                    >
                        <FaBell className="mr-2" /> Notifications
                    </button>

                    <button 
                        className={`flex items-center px-4 py-3 border-b-2 ${
                            activeTab === "integrations" 
                                ? "border-blue-500 text-blue-500" 
                                : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                        }`}
                        onClick={() => setActiveTab("integrations")}
                    >
                        <FaLink className="mr-2" /> Integrations
                    </button>
                </div>
                
                {/* Content area */}
                <div className="p-6">
                    {renderActiveTab()}
                </div>
            </div>
        </div>
    );
}