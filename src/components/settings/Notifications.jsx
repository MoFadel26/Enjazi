import React, { useState } from "react";

const Notifications = () => {
  // State for notification settings
  const [emailSettings, setEmailSettings] = useState({
    dailyDigest: true,
    weeklySummary: true,
    taskReminders: true,
    streakUpdates: true,
  });

  const [browserSettings, setBrowserSettings] = useState({
    pomodoroTimer: true,
    taskDueSoon: true,
    roomUpdates: false,
    goalAchievements: false,
  });

  const [quietHours, setQuietHours] = useState({
    enabled: false,
    from: "00:00", 
    to: "06:00", 
  });

  // Handle email notification toggles
  const handleEmailToggle = (setting) => {
    setEmailSettings({
      ...emailSettings,
      [setting]: !emailSettings[setting],
    });
  };

  // Handle browser notification toggles
  const handleBrowserToggle = (setting) => {
    setBrowserSettings({
      ...browserSettings,
      [setting]: !browserSettings[setting],
    });
  };

  // Handle quiet hours toggle
  const handleQuietHoursToggle = () => {
    setQuietHours({
      ...quietHours,
      enabled: !quietHours.enabled,
    });
  };

  // Handle time input changes
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setQuietHours({
      ...quietHours,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Notification settings saved:", {
      emailSettings,
      browserSettings,
      quietHours,
    });
    // Add logic to save settings
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Notification Preferences</h2>
      <p className="text-gray-600 text-sm mb-6">
        Choose which notifications you'd like to receive and how you want to receive them.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Email Notifications */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Email Notifications</h3>
          
          <div className="space-y-4">
            {/* Daily Digest */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Daily Digest</p>
                <p className="text-xs text-gray-500">Get a summary of your daily activities</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  emailSettings.dailyDigest ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => handleEmailToggle("dailyDigest")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    emailSettings.dailyDigest ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Weekly Summary */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Weekly Summary</p>
                <p className="text-xs text-gray-500">Receive a weekly progress report</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  emailSettings.weeklySummary ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => handleEmailToggle("weeklySummary")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    emailSettings.weeklySummary ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Task Reminders */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Task Reminders</p>
                <p className="text-xs text-gray-500">Get reminded about upcoming and overdue tasks</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  emailSettings.taskReminders ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => handleEmailToggle("taskReminders")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    emailSettings.taskReminders ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Streak Updates */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Streak Updates</p>
                <p className="text-xs text-gray-500">Be notified about your streak progress</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  emailSettings.streakUpdates ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => handleEmailToggle("streakUpdates")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    emailSettings.streakUpdates ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Browser Notifications */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Browser Notifications</h3>
          
          <div className="space-y-4">
            {/* Pomodoro Timer */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Pomodoro Timer</p>
                <p className="text-xs text-gray-500">Notifications when your timer ends</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  browserSettings.pomodoroTimer ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => handleBrowserToggle("pomodoroTimer")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    browserSettings.pomodoroTimer ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Task Due Soon */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Task Due Soon</p>
                <p className="text-xs text-gray-500">Get notified when tasks are due soon</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  browserSettings.taskDueSoon ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => handleBrowserToggle("taskDueSoon")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    browserSettings.taskDueSoon ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Room Updates */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Room Updates</p>
                <p className="text-xs text-gray-500">Notifications about activity in your rooms</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  browserSettings.roomUpdates ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => handleBrowserToggle("roomUpdates")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    browserSettings.roomUpdates ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Goal Achievements */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-700">Goal Achievements</p>
                <p className="text-xs text-gray-500">Get notified when you reach your goals</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  browserSettings.goalAchievements ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={() => handleBrowserToggle("goalAchievements")}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    browserSettings.goalAchievements ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notification Schedule */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Notification Schedule</h3>
          
          {/* Quiet Hours */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Quiet Hours</p>
                <p className="text-xs text-gray-500">Disable notifications during certain hours</p>
              </div>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  quietHours.enabled ? "bg-blue-500" : "bg-gray-200"
                }`}
                onClick={handleQuietHoursToggle}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    quietHours.enabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            
            <div className={`grid grid-cols-2 gap-4 ${!quietHours.enabled && "opacity-50"}`}>
              <div>
                <label htmlFor="from" className="block text-xs text-gray-500 mb-1">
                  From
                </label>
                <input
                  type="time"
                  id="from"
                  name="from"
                  value={quietHours.from}
                  onChange={handleTimeChange}
                  disabled={!quietHours.enabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="to" className="block text-xs text-gray-500 mb-1">
                  To
                </label>
                <input
                  type="time"
                  id="to"
                  name="to"
                  value={quietHours.to}
                  onChange={handleTimeChange}
                  disabled={!quietHours.enabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Save Notification Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Notifications;