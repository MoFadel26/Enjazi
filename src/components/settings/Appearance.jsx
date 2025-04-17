import React, { useState } from "react";

const Appearance = () => {
  // State for appearance settings
  const [settings, setSettings] = useState({
    colorTheme: "light", 
    accentColor: "#00A3FF", 
    fontSize: "medium", 
    animation: "enable", 
  });

  // Handle theme selection
  const handleThemeChange = (theme) => {
    setSettings({
      ...settings,
      colorTheme: theme,
    });
  };

  // Handle accent color selection
  const handleAccentColorChange = (color) => {
    setSettings({
      ...settings,
      accentColor: color,
    });
  };

  // Handle font size selection
  const handleFontSizeChange = (size) => {
    setSettings({
      ...settings,
      fontSize: size,
    });
  };

  // Handle animation preference
  const handleAnimationChange = (preference) => {
    setSettings({
      ...settings,
      animation: preference,
    });
  };

  // Accent color options
  const accentColors = [
    { name: "Blue", value: "#00A3FF" },
    { name: "Purple", value: "#A855F7" },
    { name: "Green", value: "#22C55E" },
    { name: "Orange", value: "#F97316" },
    { name: "Red", value: "#EF4444" },
    { name: "Yellow", value: "#EAB308" },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Theme Preferences</h2>
      <p className="text-gray-600 text-sm mb-6">
        Choose your preferred theme and appearance settings.
      </p>

      {/* Color Theme */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Color Theme</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            className={`flex items-center justify-center py-2 px-4 rounded-md ${
              settings.colorTheme === "light"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleThemeChange("dark")}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Dark
          </button>
          <button
            className={`flex items-center justify-center py-2 px-4 rounded-md ${
              settings.colorTheme === "system"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleThemeChange("system")}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            System
          </button>
        </div>
      </div>

      {/* Accent Color */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Accent Color</h3>
        <div className="grid grid-cols-6 gap-3">
          {accentColors.map((color) => (
            <button
              key={color.name}
              className={`h-10 rounded-md ${
                settings.accentColor === color.value ? "ring-2 ring-offset-2 ring-gray-400" : ""
              }`}
              style={{ backgroundColor: color.value }}
              onClick={() => handleAccentColorChange(color.value)}
              aria-label={`${color.name} accent color`}
            />
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Font Size</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            className={`py-2 px-4 rounded-md ${
              settings.fontSize === "small"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleFontSizeChange("small")}
          >
            Small
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              settings.fontSize === "medium"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleFontSizeChange("medium")}
          >
            Medium
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              settings.fontSize === "large"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleFontSizeChange("large")}
          >
            Large
          </button>
        </div>
      </div>

      {/* Animation Preference */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">Animation Preference</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`py-2 px-4 rounded-md ${
              settings.animation === "enable"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleAnimationChange("enable")}
          >
            Enable
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              settings.animation === "disable"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleAnimationChange("disable")}
          >
            Disable
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appearance;