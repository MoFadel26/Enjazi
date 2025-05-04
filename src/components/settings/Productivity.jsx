import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";

const Productivity = () => {
  const { isDark } = useTheme();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // State for productivity settings
  const [settings, setSettings] = useState({
    dailyTasks: 5,
    focusHours: 4,
    pomodoroSessions: 8,
    weekStartDay: "Mon",
    defaultTaskDuration: 15,
    taskOrder: "due-asc",
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
        const response = await axios.get(`${API_URL}/settings`, { withCredentials: true });
        console.log("Fetched settings:", response.data);
        
        if (response.data && response.data.data && response.data.data.productivity) {
          setSettings(response.data.data.productivity);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching productivity settings:", error);
        setErrorMessage("Failed to load settings");
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [API_URL]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setSettings({
      ...settings,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // Handle week start day selection
  const handleWeekStartChange = (day) => {
    // Convert to proper format for backend (first letter capitalized)
    const formattedDay = day.charAt(0).toUpperCase() + day.slice(1, 3);
    setSettings({
      ...settings,
      weekStartDay: formattedDay,
    });
  };

  // Map frontend task order values to backend enum values
  const mapTaskOrderToBackend = (frontendValue) => {
    const mapping = {
      "due-date-asc": "due-asc",
      "due-date-desc": "due-desc",
      "priority-asc": "priority",
      "priority-desc": "priority",
      "created-asc": "created",
      "created-desc": "created"
    };
    return mapping[frontendValue] || "due-asc";
  };

  // Map backend task order values to frontend display values
  const mapTaskOrderToFrontend = (backendValue) => {
    const mapping = {
      "due-asc": "due-date-asc",
      "due-desc": "due-date-desc",
      "priority": "priority-asc",
      "created": "created-asc"
    };
    return mapping[backendValue] || "due-date-asc";
  };

  // Handle task order change
  const handleTaskOrderChange = (e) => {
    const frontendValue = e.target.value;
    const backendValue = mapTaskOrderToBackend(frontendValue);
    
    setSettings({
      ...settings,
      taskOrder: backendValue,
      // Store the frontend display value in a separate property
      _frontendTaskOrder: frontendValue
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      
      console.log("Saving productivity settings:", settings);
      
      // Save settings to backend
      const response = await axios.patch(
        `${API_URL}/settings/productivity`, 
        {
          dailyTasks: settings.dailyTasks,
          focusHours: settings.focusHours,
          pomodoroSessions: settings.pomodoroSessions,
          weekStartDay: settings.weekStartDay,
          defaultTaskDuration: settings.defaultTaskDuration,
          taskOrder: settings.taskOrder
        },
        { withCredentials: true }
      );
      
      console.log("Save response:", response.data);
      setSuccessMessage("Productivity settings saved successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving productivity settings:", error);
      setErrorMessage("Failed to save settings: " + (error.response?.data?.message || error.message));
      setIsLoading(false);
    }
  };

  // Get the frontend display value for task order
  const getTaskOrderDisplayValue = () => {
    return settings._frontendTaskOrder || mapTaskOrderToFrontend(settings.taskOrder);
  };

  // Convert backend weekStartDay to frontend format
  const getWeekStartDayLower = () => {
    if (!settings.weekStartDay) return "mon";
    return settings.weekStartDay.toLowerCase();
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-4 md:p-6 shadow-sm`}>
      <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Daily Goals</h2>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
        Set your daily productivity targets to track your progress.
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

      <form onSubmit={handleSubmit}>
        {/* Daily Goals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {/* Daily Tasks */}
          <div>
            <label htmlFor="dailyTasks" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Daily Tasks
            </label>
            <input
              type="number"
              id="dailyTasks"
              name="dailyTasks"
              value={settings.dailyTasks}
              onChange={handleInputChange}
              min="1"
              max="50"
              className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Target number of daily tasks</p>
          </div>

          {/* Focus Hours */}
          <div>
            <label htmlFor="focusHours" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Focus Hours
            </label>
            <input
              type="number"
              id="focusHours"
              name="focusHours"
              value={settings.focusHours}
              onChange={handleInputChange}
              min="1"
              max="24"
              className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Target hours of deep focus work</p>
          </div>

          {/* Pomodoro Sessions */}
          <div>
            <label htmlFor="pomodoroSessions" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Pomodoro Sessions
            </label>
            <input
              type="number"
              id="pomodoroSessions"
              name="pomodoroSessions"
              value={settings.pomodoroSessions}
              onChange={handleInputChange}
              min="1"
              max="20"
              className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Target pomodoro sessions per day</p>
          </div>
        </div>

        {/* Week Start Day */}
        <div className="mb-8">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Week Start Day</h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
              <button
                key={day}
                type="button"
                className={`py-2 px-2 md:px-4 text-center rounded-md text-sm ${
                  getWeekStartDayLower() === day
                    ? "bg-blue-500 text-white"
                    : isDark 
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleWeekStartChange(day)}
              >
                {day.charAt(0).toUpperCase() + day.slice(1, 3)}
              </button>
            ))}
          </div>
        </div>

        {/* Task Settings */}
        <div className="mb-8">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Task Settings</h3>
          
          {/* Default Task Duration */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="defaultTaskDuration" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Default Task Duration
              </label>
              <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{settings.defaultTaskDuration} minutes</span>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Default time allocation for new tasks</p>
            <input
              type="range"
              id="defaultTaskDuration"
              name="defaultTaskDuration"
              value={settings.defaultTaskDuration}
              onChange={handleInputChange}
              min="5"
              max="120"
              step="5"
              className={`w-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg appearance-none cursor-pointer`}
            />
          </div>
          
          {/* Task Order */}
          <div>
            <label htmlFor="taskOrder" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Task Order
            </label>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-2`}>Default sorting for task lists</p>
            <select
              id="taskOrder"
              name="taskOrder"
              value={getTaskOrderDisplayValue()}
              onChange={handleTaskOrderChange}
              className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="due-date-asc">Due date (ascending)</option>
              <option value="due-date-desc">Due date (descending)</option>
              <option value="priority-asc">Priority (ascending)</option>
              <option value="priority-desc">Priority (descending)</option>
              <option value="created-asc">Created date (ascending)</option>
              <option value="created-desc">Created date (descending)</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            type="submit"
            className={`w-full sm:w-auto py-2 px-6 btn-accent rounded-md transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Productivity;