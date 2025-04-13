import React, { useState } from "react";

const Productivity = () => {
  // State for productivity settings
  const [settings, setSettings] = useState({
    dailyTasks: 5,
    focusHours: 4,
    pomodoroSessions: 8,
    weekStartDay: "mon",
    defaultTaskDuration: 15,
    taskOrder: "due-date-asc",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  // Handle week start day selection
  const handleWeekStartChange = (day) => {
    setSettings({
      ...settings,
      weekStartDay: day,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Productivity settings saved:", settings);
    // Add logic to save settings
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Daily Goals</h2>
      <p className="text-gray-600 text-sm mb-6">
        Set your daily productivity targets to track your progress.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Daily Goals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Daily Tasks */}
          <div>
            <label htmlFor="dailyTasks" className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Target number of daily tasks</p>
          </div>

          {/* Focus Hours */}
          <div>
            <label htmlFor="focusHours" className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Target hours of deep focus work</p>
          </div>

          {/* Pomodoro Sessions */}
          <div>
            <label htmlFor="pomodoroSessions" className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Target pomodoro sessions per day</p>
          </div>
        </div>

        {/* Week Start Day */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Week Start Day</h3>
          <div className="grid grid-cols-7 gap-2">
            {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
              <button
                key={day}
                type="button"
                className={`py-2 px-4 text-center rounded-md ${
                  settings.weekStartDay === day
                    ? "bg-blue-500 text-white"
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
          <h3 className="text-sm font-medium text-gray-700 mb-4">Task Settings</h3>
          
          {/* Default Task Duration */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="defaultTaskDuration" className="block text-sm font-medium text-gray-700">
                Default Task Duration
              </label>
              <span className="text-sm text-gray-500">{settings.defaultTaskDuration} minutes</span>
            </div>
            <p className="text-xs text-gray-500 mb-2">Default time allocation for new tasks</p>
            <input
              type="range"
              id="defaultTaskDuration"
              name="defaultTaskDuration"
              value={settings.defaultTaskDuration}
              onChange={handleInputChange}
              min="5"
              max="120"
              step="5"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Task Order */}
          <div>
            <label htmlFor="taskOrder" className="block text-sm font-medium text-gray-700 mb-1">
              Task Order
            </label>
            <p className="text-xs text-gray-500 mb-2">Default sorting for task lists</p>
            <select
              id="taskOrder"
              name="taskOrder"
              value={settings.taskOrder}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Productivity;