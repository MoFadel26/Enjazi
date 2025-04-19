import React, { useState } from "react";

const Pomodoro = () => {
  // State for pomodoro roles
  const [settings, setSettings] = useState({
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
    focusTimerSound: "bell",
    breakTimerSound: "ping",
    autoStartBreaks: false,
    autoStartNextFocus: false,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle sound selection
  const handleSoundSelection = (timerType, sound) => {
    if (timerType === "focus") {
      setSettings({
        ...settings,
        focusTimerSound: sound,
      });
    } else if (timerType === "break") {
      setSettings({
        ...settings,
        breakTimerSound: sound,
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pomodoro roles saved:", settings);
    // Add logic to save roles
  };

  // Test sound function
  const testSound = (sound) => {
    console.log(`Playing ${sound} sound...`);
    // Add logic to play sound
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Pomodoro Timer Settings</h2>
      <p className="text-gray-600 text-sm mb-6">
        Customize your pomodoro timer durations and break intervals.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Timer Durations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Focus Duration */}
          <div>
            <label htmlFor="focusDuration" className="block text-sm font-medium text-gray-700 mb-1">
              Focus Duration (minutes)
            </label>
            <input
              type="number"
              id="focusDuration"
              name="focusDuration"
              value={settings.focusDuration}
              onChange={handleInputChange}
              min="1"
              max="120"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 25 minutes</p>
          </div>

          {/* Short Break */}
          <div>
            <label htmlFor="shortBreakDuration" className="block text-sm font-medium text-gray-700 mb-1">
              Short Break (minutes)
            </label>
            <input
              type="number"
              id="shortBreakDuration"
              name="shortBreakDuration"
              value={settings.shortBreakDuration}
              onChange={handleInputChange}
              min="1"
              max="30"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 5 minutes</p>
          </div>

          {/* Long Break */}
          <div>
            <label htmlFor="longBreakDuration" className="block text-sm font-medium text-gray-700 mb-1">
              Long Break (minutes)
            </label>
            <input
              type="number"
              id="longBreakDuration"
              name="longBreakDuration"
              value={settings.longBreakDuration}
              onChange={handleInputChange}
              min="1"
              max="60"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 15 minutes</p>
          </div>
        </div>

        {/* Sessions Before Long Break */}
        <div className="mb-6">
          <label htmlFor="sessionsBeforeLongBreak" className="block text-sm font-medium text-gray-700 mb-1">
            Sessions Before Long Break
          </label>
          <input
            type="number"
            id="sessionsBeforeLongBreak"
            name="sessionsBeforeLongBreak"
            value={settings.sessionsBeforeLongBreak}
            onChange={handleInputChange}
            min="1"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Number of focus sessions before taking a long break</p>
        </div>

        {/* Audio Notifications */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Audio Notifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Focus Timer End */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Focus Timer End</p>
                <p className="text-xs text-gray-500">Sound when focus session ends</p>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={() => testSound(settings.focusTimerSound)}
                >
                  Test
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm border rounded-md ${
                    settings.focusTimerSound === "bell"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => handleSoundSelection("focus", "bell")}
                >
                  Bell
                </button>
              </div>
            </div>

            {/* Break Timer End */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Break Timer End</p>
                <p className="text-xs text-gray-500">Sound when break session ends</p>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={() => testSound(settings.breakTimerSound)}
                >
                  Test
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm border rounded-md ${
                    settings.breakTimerSound === "ping"
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() => handleSoundSelection("break", "ping")}
                >
                  Ping
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Auto-Start Options */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Auto-Start Options</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoStartBreaks"
                name="autoStartBreaks"
                checked={settings.autoStartBreaks}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoStartBreaks" className="ml-2 block text-sm text-gray-700">
                Auto-start breaks
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoStartNextFocus"
                name="autoStartNextFocus"
                checked={settings.autoStartNextFocus}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoStartNextFocus" className="ml-2 block text-sm text-gray-700">
                Auto-start next focus session after break
              </label>
            </div>
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

export default Pomodoro;