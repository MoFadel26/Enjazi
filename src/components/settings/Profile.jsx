import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";

export default function Profile() {
  const { isDark } = useTheme();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    avatarUrl: ""
  });
  
  // State for password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for loading and messages
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Get user info
        const userResponse = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
        console.log("Fetched user info:", userResponse.data);
        
        // Get settings
        const settingsResponse = await axios.get(`${API_URL}/settings`, { withCredentials: true });
        console.log("Fetched settings:", settingsResponse.data);
        
        if (userResponse.data && settingsResponse.data && settingsResponse.data.data) {
          setUserData({
            ...userResponse.data,
            settings: settingsResponse.data.data
          });
          
          // Initialize form with user data
          setFormData({
            username: userResponse.data.username || "",
            bio: settingsResponse.data.data.profile?.bio || "",
            avatarUrl: settingsResponse.data.data.profile?.avatarUrl || ""
          });
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setErrorMessage("Failed to load user data");
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [API_URL]);

  // Handle profile form changes
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, just create a local URL for preview
      // In a real app, you'd upload this to your server or cloud storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatarUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle password form changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  // Handle profile form submission
const handleProfileSubmit = async (e) => {
  e.preventDefault();
  setSuccessMessage("");
  setErrorMessage("");
  
  try {
    setIsLoading(true);
    
    // Update username and bio in one request
    const userUpdateResponse = await axios.patch(
      `${API_URL}/users/me`, 
      { 
        username: formData.username
      },
      { withCredentials: true }
    );
    
    console.log("User update response:", userUpdateResponse.data);
    
    // Update profile settings (avatar)
    const profileResponse = await axios.patch(
      `${API_URL}/settings/profile`, 
      {
        bio: formData.bio,
        avatarUrl: formData.avatarUrl
      },
      { withCredentials: true }
    );
    
    console.log("Profile update response:", profileResponse.data);
    setSuccessMessage("Profile updated successfully");
    setIsLoading(false);
  } catch (error) {
    console.error("Error updating profile:", error);
    setErrorMessage(`Failed to update profile: ${error.response?.data?.message || error.message}`);
    setIsLoading(false);
  }
};

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage("New passwords don't match");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const response = await axios.post(
        `${API_URL}/password/change`, 
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        },
        { withCredentials: true }
      );
      
      console.log("Password update response:", response.data);
      setSuccessMessage("Password updated successfully");
      
      // Clear password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage(`Failed to update password: ${error.response?.data?.message || error.message}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Success message */}
      {successMessage && (
        <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} p-4 rounded-lg`}>
          <p className={`${isDark ? 'text-green-200' : 'text-green-600'}`}>{successMessage}</p>
        </div>
      )}
      
      {/* Error message */}
      {errorMessage && (
        <div className={`${isDark ? 'bg-red-900' : 'bg-red-100'} p-4 rounded-lg`}>
          <p className={`${isDark ? 'text-red-200' : 'text-red-600'}`}>{errorMessage}</p>
        </div>
      )}
    
      {/* Profile Information Section */}
      <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Profile Information</h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
          Update your personal information and how others see you on the platform.
        </p>
        
        <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Avatar Section */}
          <div className="col-span-1">
            <div className="flex flex-col items-center justify-center h-full">
              {formData.avatarUrl ? (
                <div className="w-32 h-32 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={formData.avatarUrl} 
                    alt="User avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-32 h-32 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg mb-4 flex items-center justify-center`}>
                  <span className={`text-4xl ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {formData.username && formData.username[0] ? formData.username[0].toUpperCase() : '?'}
                  </span>
                </div>
              )}
              
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <label 
                htmlFor="avatar"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm cursor-pointer"
              >
                Change Avatar
              </label>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>PNG, JPG up to 2MB</p>
            </div>
          </div>
          
          {/* Form Fields */}
          <div className="col-span-2 space-y-4">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleProfileChange}
                placeholder="Username"
                className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <div>
              <label htmlFor="bio" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleProfileChange}
                placeholder="Tell us a bit about yourself"
                rows="4"
                className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className={`${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded`}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Account Security Section */}
      <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Account Security</h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
          Manage your password and account security settings.
        </p>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="newPassword" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border ${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded`}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}