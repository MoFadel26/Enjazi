import React, { useState, useEffect } from "react";
import { 
  FaGoogle, 
  FaSlack, 
  FaGithub,
  FaFileAlt, 
  FaCheckSquare,
  FaLink,
  FaUnlink
} from "react-icons/fa";
import axios from "axios";
import { useTheme } from "../../contexts/ThemeContext";

const Integrations = () => {
  const { isDark } = useTheme();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  const [integrations, setIntegrations] = useState({
    googleCalendar: { connected: false },
    slack: { connected: false },
    notion: { connected: false },
    todoist: { connected: false },
    github: { connected: false }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch integration status on component mount
  useEffect(() => {
    const fetchIntegrations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/settings`, { withCredentials: true });
        
        if (response.data && response.data.data && response.data.data.integrations) {
          setIntegrations(response.data.data.integrations);
        }
        
        // Check for success/error messages in URL
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');
        const error = urlParams.get('error');
        
        if (success) {
          setSuccessMessage(success.replace(/_/g, ' '));
          // Clear URL params
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        if (error) {
          setError(error.replace(/_/g, ' '));
          // Clear URL params
          window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching integrations:", error);
        setError("Failed to load integration status");
        setIsLoading(false);
      }
    };

    fetchIntegrations();
  }, [API_URL]);

  // Function to handle connect button click - opens in new page
  const handleConnect = (integration) => {
    // Open in a new tab/window
    window.open(`${API_URL}/oauth/${integration}/connect`, '_blank');
  };
  
  // Function to handle disconnect button click
  const handleDisconnect = async (integration) => {
    try {
      setIsLoading(true);
      
      await axios.delete(`${API_URL}/oauth/${integration}/disconnect`, { withCredentials: true });
      
      // Update local state
      setIntegrations(prev => ({
        ...prev,
        [integration]: { 
          ...prev[integration], 
          connected: false 
        }
      }));
      
      setSuccessMessage(`${integration} disconnected successfully`);
      setIsLoading(false);
    } catch (error) {
      console.error(`Error disconnecting ${integration}:`, error);
      setError(`Failed to disconnect ${integration}`);
      setIsLoading(false);
    }
  };

  return (
    <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
      <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Third-Party Integrations</h2>
      <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
        Connect Enjazi with your favorite tools and services.
      </p>
      
      {/* Success message */}
      {successMessage && (
        <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} p-4 rounded-lg mb-6`}>
          <p className={`${isDark ? 'text-green-200' : 'text-green-600'}`}>{successMessage}</p>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className={`${isDark ? 'bg-red-900' : 'bg-red-100'} p-4 rounded-lg mb-6`}>
          <p className={`${isDark ? 'text-red-200' : 'text-red-600'}`}>{error}</p>
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
                <FaGoogle className={`${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Google Calendar</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {integrations.googleCalendar?.connected 
                    ? "Connected - Syncing your tasks with Google Calendar" 
                    : "Sync your tasks with Google Calendar"}
                </p>
              </div>
            </div>
            {integrations.googleCalendar?.connected ? (
              <button
                onClick={() => handleDisconnect('google')}
                disabled={isLoading}
                className={`${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaUnlink className="mr-1" /> Disconnect
              </button>
            ) : (
              <button
                onClick={() => handleConnect('google')}
                disabled={isLoading}
                className={`${isDark ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaLink className="mr-1" /> Connect
              </button>
            )}
          </div>

          {/* Notion */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaFileAlt className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Notion</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {integrations.notion?.connected 
                    ? "Connected - Importing and exporting tasks with Notion" 
                    : "Import and export tasks between Notion and Enjazi"}
                </p>
              </div>
            </div>
            {integrations.notion?.connected ? (
              <button
                onClick={() => handleDisconnect('notion')}
                disabled={isLoading}
                className={`${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaUnlink className="mr-1" /> Disconnect
              </button>
            ) : (
              <button
                onClick={() => handleConnect('notion')}
                disabled={isLoading}
                className={`${isDark ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaLink className="mr-1" /> Connect
              </button>
            )}
          </div>

          {/* Todoist */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-red-900' : 'bg-red-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaCheckSquare className={`${isDark ? 'text-red-400' : 'text-red-500'}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Todoist</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {integrations.todoist?.connected 
                    ? "Connected - Syncing your tasks with Todoist" 
                    : "Sync your tasks with Todoist"}
                </p>
              </div>
            </div>
            {integrations.todoist?.connected ? (
              <button
                onClick={() => handleDisconnect('todoist')}
                disabled={isLoading}
                className={`${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaUnlink className="mr-1" /> Disconnect
              </button>
            ) : (
              <button
                onClick={() => handleConnect('todoist')}
                disabled={isLoading}
                className={`${isDark ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaLink className="mr-1" /> Connect
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Collaboration Tools */}
      <div>
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-4`}>Collaboration Tools</h3>
        
        <div className="space-y-4">
          {/* Slack */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-purple-900' : 'bg-purple-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaSlack className={`${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Slack</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {integrations.slack?.connected 
                    ? `Connected to ${integrations.slack.teamName || 'your workspace'}` 
                    : "Receive notifications and updates in your Slack workspace"}
                </p>
              </div>
            </div>
            {integrations.slack?.connected ? (
              <button
                onClick={() => handleDisconnect('slack')}
                disabled={isLoading}
                className={`${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaUnlink className="mr-1" /> Disconnect
              </button>
            ) : (
              <button
                onClick={() => handleConnect('slack')}
                disabled={isLoading}
                className={`${isDark ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaLink className="mr-1" /> Connect
              </button>
            )}
          </div>

          {/* GitHub */}
          <div className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'} rounded-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg flex items-center justify-center mr-4`}>
                <FaGithub className={`${isDark ? 'text-white' : 'text-gray-800'}`} />
              </div>
              <div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>GitHub</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {integrations.github?.connected 
                    ? `Connected as ${integrations.github.username || 'your account'}` 
                    : "Connect your GitHub account to track development tasks"}
                </p>
              </div>
            </div>
            {integrations.github?.connected ? (
              <button
                onClick={() => handleDisconnect('github')}
                disabled={isLoading}
                className={`${isDark ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaUnlink className="mr-1" /> Disconnect
              </button>
            ) : (
              <button
                onClick={() => handleConnect('github')}
                disabled={isLoading}
                className={`${isDark ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-500 hover:bg-blue-600'} text-white py-1 px-4 rounded text-sm flex items-center`}
              >
                <FaLink className="mr-1" /> Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;