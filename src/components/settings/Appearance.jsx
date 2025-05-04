// src/components/settings/Appearance.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAccentColor } from "../../contexts/AccentColorContext";
import axios from "axios";
import "../../styles/accentColor.css";

const Appearance = ({ onThemeChange }) => {
  // Use the theme and accent color contexts
  const { isDark } = useTheme();
  const { accentColor, setAccentColor } = useAccentColor();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // State for appearance settings
  const [settings, setSettings] = useState({
    colorTheme: isDark ? "dark" : "light", 
    accentColor: accentColor, 
    fontSize: "medium", 
    animation: "enable", 
  });

  // State for loading and messages
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch current settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/settings/appearance`, { withCredentials: true });
        const appearanceData = response.data;
        
        // Update local state with fetched settings
        setSettings({
          colorTheme: appearanceData.colorTheme || (isDark ? "dark" : "light"),
          accentColor: enumToHexMap[appearanceData.accentColor] || accentColor,
          fontSize: appearanceData.fontSize || "medium",
          animation: appearanceData.animation ? "enable" : "disable"
        });
        
        // Update theme and accent color contexts
        if (appearanceData.colorTheme) {
          onThemeChange(appearanceData.colorTheme);
        }
        
        if (appearanceData.accentColor) {
          setAccentColor(enumToHexMap[appearanceData.accentColor] || accentColor);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appearance settings:", error);
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [API_URL, isDark, accentColor, onThemeChange, setAccentColor]);

  // Update local state when isDark or accentColor changes
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      colorTheme: isDark ? "dark" : "light",
      accentColor: accentColor
    }));
  }, [isDark, accentColor]);

  // Handle theme selection
  const handleThemeChange = (theme) => {
    setSettings({
      ...settings,
      colorTheme: theme,
    });
    
    // Call the parent component's theme change handler
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  // Handle accent color change
  const handleAccentColorChange = (color) => {
    setSettings({
      ...settings,
      accentColor: color,
    });
    
    // Update the accent color in the context
    setAccentColor(color);
  };

  // Handle font size change
  const handleFontSizeChange = (size) => {
    setSettings({
      ...settings,
      fontSize: size,
    });
  };

  // Handle animation toggle
  const handleAnimationChange = (value) => {
    setSettings({
      ...settings,
      animation: value,
    });
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      
      // Convert settings to match backend schema
      const appearanceData = {
        colorTheme: settings.colorTheme, // This should be "light" or "dark"
        accentColor: hexToEnumMap[settings.accentColor] || "blue",
        fontSize: settings.fontSize,
        animation: settings.animation === "enable"
      };
      
      console.log("Saving appearance settings:", appearanceData);
      
      // Save settings to backend
      const response = await axios.patch(
        `${API_URL}/settings/appearance`, 
        appearanceData,
        { withCredentials: true }
      );
      
      console.log("Response from server:", response.data);
      
      // Also save to localStorage for persistence
      localStorage.setItem('theme', settings.colorTheme);
      localStorage.setItem('accentColor', settings.accentColor);
      
      setSuccessMessage("Appearance settings saved successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving appearance settings:", error);
      setErrorMessage("Failed to save settings: " + (error.response?.data?.error || error.message));
      setIsLoading(false);
    }
  };

  // Available accent colors
  const accentColors = [
    { hex: "#00A3FF", name: "Blue" },
    { hex: "#FF3B30", name: "Red" },
    { hex: "#34C759", name: "Green" },
    { hex: "#AF52DE", name: "Purple" },
    { hex: "#FF9500", name: "Orange" }
  ];

  // Map hex colors to enum values for backend
  const hexToEnumMap = {
    "#00A3FF": "blue",
    "#FF3B30": "red",
    "#34C759": "green",
    "#AF52DE": "purple",
    "#FF9500": "orange"
  };
  
  // Map enum values to hex colors for frontend
  const enumToHexMap = {
    "blue": "#00A3FF",
    "red": "#FF3B30",
    "green": "#34C759",
    "purple": "#AF52DE",
    "orange": "#FF9500"
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-4 md:p-6 shadow-sm`}>
      <h2 className="text-xl font-semibold mb-2">Theme Preferences</h2>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
        Choose your preferred theme and appearance settings.
      </p>

      {/* Success message */}
      {successMessage && (
        <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} p-4 rounded-lg mb-4`}>
          <p className={`${isDark ? 'text-green-200' : 'text-green-600'}`}>{successMessage}</p>
        </div>
      )}
      
      {/* Error message */}
      {errorMessage && (
        <div className={`${isDark ? 'bg-red-900' : 'bg-red-100'} p-4 rounded-lg mb-4`}>
          <p className={`${isDark ? 'text-red-200' : 'text-red-600'}`}>{errorMessage}</p>
        </div>
      )}

      {/* Color Theme */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Color Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`flex items-center justify-center py-2 px-4 rounded-md ${
              settings.colorTheme === "light"
                ? "accent-bg text-white"
                : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleThemeChange("light")}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Light
          </button>
          <button
            className={`flex items-center justify-center py-2 px-4 rounded-md ${
              settings.colorTheme === "dark"
                ? "accent-bg text-white"
                : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleThemeChange("dark")}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Dark
          </button>
        </div>
      </div>

      {/* Accent Color */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Accent Color</h3>
        <div className="grid grid-cols-5 gap-3">
          {accentColors.map((color) => (
            <div key={color.hex} className="flex flex-col items-center">
              <button
                className={`w-10 h-10 rounded-full ${
                  settings.accentColor === color.hex ? "ring-2 ring-offset-2 ring-accent" : ""
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleAccentColorChange(color.hex)}
                aria-label={`Select ${color.name} as accent color`}
              />
              <span className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {color.name}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>
            Preview with current accent color:
          </p>
          <div className="flex flex-wrap gap-2">
            <button className="accent-bg text-white px-3 py-1 rounded-md">Button</button>
            <div className="accent-text font-medium">Text</div>
            <div className="border-2 accent-border px-3 py-1 rounded-md">Border</div>
          </div>
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Font Size</h3>
        <div className="grid grid-cols-3 gap-3">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              className={`py-2 px-4 rounded-md ${
                settings.fontSize === size
                  ? "accent-bg text-white"
                  : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleFontSizeChange(size)}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Animation */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Animation</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`py-2 px-4 rounded-md ${
              settings.animation === "enable"
                ? "accent-bg text-white"
                : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleAnimationChange("enable")}
          >
            Enable
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              settings.animation === "disable"
                ? "accent-bg text-white"
                : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleAnimationChange("disable")}
          >
            Disable
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button
        className={`w-full py-2 px-4 btn-accent rounded-md transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        onClick={handleSave}
        disabled={isLoading}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );



  
};

export default Appearance;