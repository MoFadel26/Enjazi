// src/components/settings/Appearance.jsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Appearance = ({ onThemeChange }) => {
  // Use the theme context
  const { isDark } = useTheme();
  
  // State for appearance settings
  const [settings, setSettings] = useState({
    colorTheme: isDark ? "dark" : "light", 
    accentColor: "#00A3FF", 
    fontSize: "medium", 
    animation: "enable", 
  });

  // Update local state when isDark changes
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      colorTheme: isDark ? "dark" : "light"
    }));
  }, [isDark]);

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

  // Handle save settings
  const handleSave = () => {
    // Here you would typically save settings to a backend or localStorage
    console.log("Saving settings:", settings);
    // You could also show a success message
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
      <h2 className="text-xl font-semibold mb-2">Theme Preferences</h2>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
        Choose your preferred theme and appearance settings.
      </p>

      {/* Color Theme */}
      <div className="mb-6">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Color Theme</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`flex items-center justify-center py-2 px-4 rounded-md ${
              settings.colorTheme === "light"
                ? "bg-blue-500 text-white"
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
                ? "bg-blue-500 text-white"
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
          {["#00A3FF", "#FF3B30", "#34C759", "#AF52DE", "#FF9500"].map((color) => (
            <button
              key={color}
              className={`w-10 h-10 rounded-full ${
                settings.accentColor === color ? "ring-2 ring-offset-2 ring-gray-400" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleAccentColorChange(color)}
              aria-label={`Select ${color} as accent color`}
            />
          ))}
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
                  ? "bg-blue-500 text-white"
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
                ? "bg-blue-500 text-white"
                : isDark ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleAnimationChange("enable")}
          >
            Enable
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              settings.animation === "disable"
                ? "bg-blue-500 text-white"
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
        className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-200"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Appearance;