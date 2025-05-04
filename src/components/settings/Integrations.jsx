import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";
import { 
  FaGoogle, 
  FaSlack, 
  FaGithub, 
  FaFileAlt, 
  FaCheckSquare 
} from "react-icons/fa";

const Integrations = () => {
  const { isDark } = useTheme();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // State for integration settings
  const [settings, setSettings] = useState({
    googleCalendar: false,
    slack: false,
    notion: false,
    todoist: false,
    github: false
  });

  // State for loading and messages
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [connectingService, setConnectingService] = useState(null);

  // Fetch current settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/settings`, { withCredentials: true });
        console.log("Fetched settings:", response.data);
        
        if (response.data && response.data.data && response.data.data.integrations) {
          setSettings(response.data.data.integrations);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching integration settings:", error);
        setErrorMessage("Failed to load settings");
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, [API_URL]);

  // Function to handle connect button click
  const handleConnect = async (integration) => {
    try {
      setConnectingService(integration);
      setErrorMessage("");
      setSuccessMessage("");
      
      console.log(`Connecting to ${integration}...`);
      
      // Map frontend service names to backend field names
      const serviceMap = {
        "Google Calendar": "googleCalendar",
        "Slack": "slack",
        "Notion": "notion",
        "Todoist": "todoist",
        "GitHub": "github"
      };
      
      const fieldName = serviceMap[integration];
      if (!fieldName) {
        throw new Error("Unknown integration service");
      }
      
      // Update the settings state
      const updatedSettings = {
        ...settings,
        [fieldName]: !settings[fieldName]
      };
      
      // Save to backend
      const response = await axios.patch(
        `${API_URL}/settings/integrations`, 
        updatedSettings,
        { withCredentials: true }
      );
      
      console.log("Save response:", response.data);
      setSettings(updatedSettings);
      
      const action = updatedSettings[fieldName] ? "connected to" : "disconnected from";
      setSuccessMessage(`Successfully ${action} ${integration}`);
      setConnectingService(null);
    } catch (error) {
      console.error(`Error connecting to ${integration}:`, error);
      setErrorMessage(`Failed to connect: ${error.response?.data?.message || error.message}`);
      setConnectingService(null);
    }
  };

  // Get button text based on connection status
  const getButtonText = (service, fieldName) => {
    if (connectingService === service) {
      return "Connecting...";
    }
    return settings[fieldName] ? "Disconnect" : "Connect";
  };

  // Get button class based on connection status
  const getButtonClass = (fieldName) => {
    return settings[fieldName] 
      ? `bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded text-sm`
      : `bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded text-sm`;
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
      <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Third-Party Integrations</h2>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
        Connect Enjazi with your favorite tools and services.
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

      {/* Calendar Integrations */}
      <div className="mb-8">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Calendar Integrations</h3>
        
        <div className="space-y-4">
          {/* Google Calendar */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-blue-900' : 'bg-blue-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaGoogle className="text-blue-500" />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Google Calendar</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sync your tasks with Google Calendar</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("Google Calendar")}
              className={getButtonClass("googleCalendar")}
              disabled={connectingService !== null}
            >
              {getButtonText("Google Calendar", "googleCalendar")}
            </button>
          </div>

          {/* Notion */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaFileAlt className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Notion</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Import and export tasks between Notion and Enjazi</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("Notion")}
              className={getButtonClass("notion")}
              disabled={connectingService !== null}
            >
              {getButtonText("Notion", "notion")}
            </button>
          </div>

          {/* Todoist */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-red-900' : 'bg-red-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaCheckSquare className="text-red-500" />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Todoist</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Sync your tasks with Todoist</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("Todoist")}
              className={getButtonClass("todoist")}
              disabled={connectingService !== null}
            >
              {getButtonText("Todoist", "todoist")}
            </button>
          </div>
        </div>
      </div>

      {/* Collaboration Tools */}
      <div>
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Collaboration Tool</h3>
        
        <div className="space-y-4">
          {/* Slack */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-purple-900' : 'bg-purple-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaSlack className="text-purple-500" />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Slack</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Receive notifications and updates in your Slack workspace</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("Slack")}
              className={getButtonClass("slack")}
              disabled={connectingService !== null}
            >
              {getButtonText("Slack", "slack")}
            </button>
          </div>

          {/* GitHub */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaGithub className={`${isDark ? 'text-gray-300' : 'text-gray-800'}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>GitHub</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Connect your GitHub account to track development tasks</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("GitHub")}
              className={getButtonClass("github")}
              disabled={connectingService !== null}
            >
              {getButtonText("GitHub", "github")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;