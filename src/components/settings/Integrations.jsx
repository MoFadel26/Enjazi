import React from "react";
import { 
  FaGoogle, 
  FaSlack, 
  FaGithub, 
//   FaCalendarAlt, 
  FaFileAlt, 
  FaCheckSquare 
} from "react-icons/fa";

const Integrations = () => {
  // Function to handle connect button click
  const handleConnect = (integration) => {
    console.log(`Connecting to ${integration}...`);
    // Add logic to connect to the service
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">Third-Party Integrations</h2>
      <p className="text-gray-600 text-sm mb-6">
        Connect Enjazi with your favorite tools and services.
      </p>

      {/* Calendar Integrations */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Calendar Integrations</h3>
        
        <div className="space-y-4">
          {/* Google Calendar */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FaGoogle className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Google Calendar</p>
                <p className="text-xs text-gray-500">Sync your tasks with Google Calendar</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("Google Calendar")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded text-sm"
            >
              Connect
            </button>
          </div>

          {/* Notion */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <FaFileAlt className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Notion</p>
                <p className="text-xs text-gray-500">Import and export tasks between Notion and Enjazi</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("Notion")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded text-sm"
            >
              Connect
            </button>
          </div>

          {/* Todoist */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                <FaCheckSquare className="text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Todoist</p>
                <p className="text-xs text-gray-500">Sync your tasks with Todoist</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("Todoist")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded text-sm"
            >
              Connect
            </button>
          </div>
        </div>
      </div>

      {/* Collaboration Tools */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Collaboration Tool</h3>
        
        <div className="space-y-4">
          {/* Slack */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <FaSlack className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Slack</p>
                <p className="text-xs text-gray-500">Receive notifications and updates in your Slack workspace</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("Slack")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded text-sm"
            >
              Connect
            </button>
          </div>

          {/* GitHub */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                <FaGithub className="text-gray-800" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">GitHub</p>
                <p className="text-xs text-gray-500">Connect your GitHub account to track development tasks</p>
              </div>
            </div>
            <button
              onClick={() => handleConnect("GitHub")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded text-sm"
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;