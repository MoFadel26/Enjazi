import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";

const Pomodoro = () => {
  const { isDark } = useTheme();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // State for pomodoro settings
  const [settings, setSettings] = useState({
    focusDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionBeforeLongBreak: 4,
    autoStart: false,
    autoStartNext: false,
    audio: {
      focusEndSound: 'bell.mp3',
      breakEndSound: 'ping.mp3'
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
        
        if (response.data && response.data.pomodoro) {
          setSettings(response.data.pomodoro);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pomodoro settings:", error);
        setErrorMessage("Failed to load settings");
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [API_URL]);

  // Handle input changes for number fields
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Handle sound selection
  const handleSoundSelection = (timerType, sound) => {
    setSettings(prev => ({
      ...prev,
      audio: {
        ...prev.audio,
        [timerType === "focus" ? "focusEndSound" : "breakEndSound"]: `${sound}.mp3`
      }
    }));
  };

  // Test sound function
  const testSound = (soundFile) => {
    try {
      console.log(`Playing ${soundFile} sound...`);
      // Create a simple beep sound as fallback
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      if (soundFile.includes("bell")) {
        oscillator.type = "sine";
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.5;
        oscillator.start();
        setTimeout(() => oscillator.stop(), 500);
      } else if (soundFile.includes("ping")) {
        oscillator.type = "sine";
        oscillator.frequency.value = 1200;
        gainNode.gain.value = 0.3;
        oscillator.start();
        setTimeout(() => oscillator.stop(), 300);
      }
    } catch (error) {
      console.error("Error testing sound:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage("");
      setSuccessMessage("");
      
      console.log("Saving pomodoro settings:", settings);
      
      // Save settings to backend
      const response = await axios.patch(
        `${API_URL}/settings/pomodoro`, 
        settings,
        { withCredentials: true }
      );
      
      console.log("Save response:", response.data);
      setSuccessMessage("Pomodoro settings saved successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error saving pomodoro settings:", error);
      setErrorMessage("Failed to save settings: " + (error.response?.data?.message || error.message));
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-4 md:p-6 shadow-sm`}>
      <h2 className="text-xl font-semibold mb-2">Pomodoro Timer Settings</h2>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
        Customize your pomodoro timer durations and break intervals.
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
        {/* Timer Durations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Focus Duration */}
          <div>
            <label htmlFor="focusDuration" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Focus Duration (minutes)
            </label>
            <input
              type="number"
              id="focusDuration"
              name="focusDuration"
              value={settings.focusDuration}
              onChange={handleNumberChange}
              min="1"
              max="120"
              className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Recommended: 25 minutes</p>
          </div>

          {/* Short Break */}
          <div>
            <label htmlFor="shortBreak" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Short Break (minutes)
            </label>
            <input
              type="number"
              id="shortBreak"
              name="shortBreak"
              value={settings.shortBreak}
              onChange={handleNumberChange}
              min="1"
              max="30"
              className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Recommended: 5 minutes</p>
          </div>

          {/* Long Break */}
          <div>
            <label htmlFor="longBreak" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Long Break (minutes)
            </label>
            <input
              type="number"
              id="longBreak"
              name="longBreak"
              value={settings.longBreak}
              onChange={handleNumberChange}
              min="1"
              max="60"
              className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Recommended: 15 minutes</p>
          </div>
        </div>

        {/* Sessions Before Long Break */}
        <div className="mb-6">
          <label htmlFor="sessionBeforeLongBreak" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Sessions Before Long Break
          </label>
          <input
            type="number"
            id="sessionBeforeLongBreak"
            name="sessionBeforeLongBreak"
            value={settings.sessionBeforeLongBreak}
            onChange={handleNumberChange}
            min="1"
            max="10"
            className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Number of focus sessions before taking a long break</p>
        </div>

        {/* Audio Notifications */}
        <div className="mb-6">
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Audio Notifications</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Focus Timer End */}
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Focus Timer End</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sound when focus session ends</p>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className={`px-3 py-1 text-sm border ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} rounded-md`}
                  onClick={() => testSound(settings.audio?.focusEndSound || 'bell.mp3')}
                >
                  Test
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm border rounded-md ${
                    settings.audio?.focusEndSound === "bell.mp3"
                      ? "accent-bg text-white"
                      : isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'
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
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Break Timer End</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sound when break session ends</p>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className={`px-3 py-1 text-sm border ${isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'} rounded-md`}
                  onClick={() => testSound(settings.audio?.breakEndSound || 'ping.mp3')}
                >
                  Test
                </button>
                <button
                  type="button"
                  className={`px-3 py-1 text-sm border rounded-md ${
                    settings.audio?.breakEndSound === "ping.mp3"
                      ? "accent-bg text-white"
                      : isDark ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'
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
          <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>Auto-Start Options</h3>
          
          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoStart"
                name="autoStart"
                checked={settings.autoStart}
                onChange={handleCheckboxChange}
                className="h-4 w-4 accent-bg border-gray-300 rounded"
              />
              <label htmlFor="autoStart" className={`ml-2 block text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Auto-start breaks
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoStartNext"
                name="autoStartNext"
                checked={settings.autoStartNext}
                onChange={handleCheckboxChange}
                className="h-4 w-4 accent-bg border-gray-300 rounded"
              />
              <label htmlFor="autoStartNext" className={`ml-2 block text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Auto-start next focus session after break
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 btn-accent rounded-md transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
};

export default Pomodoro;