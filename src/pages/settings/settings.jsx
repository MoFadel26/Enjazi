// src/pages/roles/roles.jsx
import React, { useState } from "react";
import { FaUser, FaPalette, FaClock, FaChartLine, FaBell, FaLink, FaBars } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
// No need to import accent color CSS here since it's global now

// Import your components
import Profile from '../../components/settings/Profile';
import Appearance from "../../components/settings/Appearance";
import Pomodoro from "../../components/settings/Pomodoro";
import Productivity from "../../components/settings/Productivity";   
import Notifications from "../../components/settings/Notifications";   
import Integrations from "../../components/settings/Integrations";

export default function Settings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    
    // Tab configuration
    const tabs = [
        { id: "profile", name: "Profile", icon: <FaUser className="mr-2" /> },
        { id: "appearance", name: "Appearance", icon: <FaPalette className="mr-2" /> },
        { id: "pomodoro", name: "Pomodoro", icon: <FaClock className="mr-2" /> },
        { id: "productivity", name: "Productivity", icon: <FaChartLine className="mr-2" /> },
        { id: "notifications", name: "Notifications", icon: <FaBell className="mr-2" /> },
        { id: "integrations", name: "Integrations", icon: <FaLink className="mr-2" /> },
    ];
    
    return (
        <div className="flex flex-col h-screen">
            {/* Main header with mobile menu toggle */}
            <header className={`flex items-center justify-between h-16 px-4 md:px-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-800 border-b border-gray-200'}`}>
                <h1 className="text-xl font-bold">Settings</h1>
                
                {/* Mobile menu toggle button - only visible on small screens */}
                <button 
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <FaBars className={`h-5 w-5 ${isDark ? 'text-white' : 'text-gray-600'}`} />
                </button>
            </header>

            {/* Main content area */}
            <div className={`flex-1 overflow-auto ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`}>
                {/* Tab navigation bar - horizontal scrolling on mobile */}
                <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block ${isDark ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
                    <div className="flex overflow-x-auto md:overflow-visible px-4 md:px-6 scrollbar-hide">
                        {tabs.map((tab) => (
                            <button 
                                key={tab.id}
                                className={`flex items-center whitespace-nowrap px-4 py-3 border-b-2 ${
                                    activeTab === tab.id 
                                    ? "border-accent text-accent" // Using accent color classes
                                    : `border-transparent ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`
                                }`}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    setMobileMenuOpen(false);
                                }}
                            >
                                {tab.icon} {tab.name}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Content area with padding that adjusts for screen size */}
                <div className="p-4 md:p-6">
                    {renderActiveTab()}
                </div>
            </div>
        </div>
    );
}