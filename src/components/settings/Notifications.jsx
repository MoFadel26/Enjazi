import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";

const Notifications = () => {
  const { isDark } = useTheme();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // State for notification settings
  const [settings, setSettings] = useState({
    email: {
      dailyDigest: true,
      weeklySummary: true,
      taskReminders: true,
      streakUpdates: true
    },
    browser: {
      pomodoroTimer: true,
      taskDueSoon: true,
      roomUpdates: false,
      goalAchievements: false
    },
    quietHours: {
      enabled: false,
      from: "00:00", 
      to: "06:00"
    }
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
        
        if (response.data && response.data.data && response.data.data.notifications) {
          setSettings(response.data.data.notifications);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notification settings:", error);
        setErrorMessage("Failed to load settings");
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [API_URL]);

  // Handle email notification toggles
  const handleEmailToggle = (setting) => {
    setSettings({
      ...settings,
      email: {
        ...settings.email,
        [setting]: !settings.email[setting]
      }
    });
  };

  // Handle browser notification toggles
  const handleBrowserToggle = (setting) => {
    setSettings({
      ...settings,
      browser: {
        ...settings.browser,
        [setting]: !settings.browser[setting]
      }
    });
  };

  // Handle quiet hours toggle
  const handleQuietHoursToggle = () => {
    setSettings({
      ...settings,
      quietHours: {
        ...settings.quietHours,
        enabled: !settings.quietHours.enabled
      }
    });
  };

  // Handle time input changes
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      quietHours: {
        ...settings.quietHours,
        [name]: value
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      
      console.log("Saving notification settings:", settings);
      
      // Save settings to backend
      const response = await axios.patch(
        `${API_URL}/settings/notifications`, 
        settings,
        { withCredentials: true }
      );
      
      console.log("Save response:", response.data);
      setSuccessMessage("Notification settings saved successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving notification settings:", error);
      setErrorMessage("Failed to save settings: " + (error.response?.data?.message || error.message));
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
      <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Notification Preferences</h2>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
        Choose which notifications you'd like to receive and how you want to receive them.
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
        {/* Email Notifications */}
        <div className="mb-8">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Email Notifications</h3>
          
          <div className="space-y-4">
            {/* Daily Digest */}
            <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Daily Digest</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Get a summary of your daily activities</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.email.dailyDigest ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={() => handleEmailToggle("dailyDigest")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.email.dailyDigest ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Weekly Summary */}
            <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Weekly Summary</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Receive a weekly progress report</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.email.weeklySummary ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={() => handleEmailToggle("weeklySummary")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.email.weeklySummary ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Task Reminders */}
            <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Task Reminders</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Get reminded about upcoming and overdue tasks</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.email.taskReminders ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={() => handleEmailToggle("taskReminders")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.email.taskReminders ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Streak Updates */}
            <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Streak Updates</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Be notified about your streak progress</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.email.streakUpdates ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={() => handleEmailToggle("streakUpdates")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.email.streakUpdates ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Browser Notifications */}
        <div className="mb-8">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Browser Notifications</h3>
          
          <div className="space-y-4">
            {/* Pomodoro Timer */}
            <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Pomodoro Timer</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Notifications when your timer ends</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.browser.pomodoroTimer ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={() => handleBrowserToggle("pomodoroTimer")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.browser.pomodoroTimer ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Task Due Soon */}
            <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Task Due Soon</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Get notified when tasks are due soon</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.browser.taskDueSoon ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={() => handleBrowserToggle("taskDueSoon")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.browser.taskDueSoon ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Room Updates */}
            <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Room Updates</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Notifications about activity in your rooms</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.browser.roomUpdates ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={() => handleBrowserToggle("roomUpdates")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.browser.roomUpdates ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Goal Achievements */}
            <div className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Goal Achievements</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Get notified when you reach your goals</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.browser.goalAchievements ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={() => handleBrowserToggle("goalAchievements")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.browser.goalAchievements ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Schedule */}
        <div className="mb-8">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Notification Schedule</h3>
          
          {/* Quiet Hours */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Quiet Hours</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Disable notifications during certain hours</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.quietHours.enabled ? "bg-blue-500" : isDark ? "bg-gray-600" : "bg-gray-200"
                }`}
                onClick={handleQuietHoursToggle}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.quietHours.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            
            <div className={`grid grid-cols-2 gap-4 ${!settings.quietHours.enabled && "opacity-50"}`}>
              <div>
                <label htmlFor="from" className={`block text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                  From
                </label>
                <input
                  type="time"
                  id="from"
                  name="from"
                  value={settings.quietHours.from}
                  onChange={handleTimeChange}
                  disabled={!settings.quietHours.enabled}
                  className={`w-full px-3 py-2 border ${
                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label htmlFor="to" className={`block text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mb-1`}>
                  To
                </label>
                <input
                  type="time"
                  id="to"
                  name="to"
                  value={settings.quietHours.to}
                  onChange={handleTimeChange}
                  disabled={!settings.quietHours.enabled}
                  className={`w-full px-3 py-2 border ${
                    isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center sm:justify-end">
          <button
            type="submit"
            className={`w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Notification Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notifications;