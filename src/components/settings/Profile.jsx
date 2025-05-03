// src/components/settings/Profile.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import axios from "axios";

export default function Profile() {
  const { isDark } = useTheme();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const fileInputRef = useRef(null);
  
  // State for form fields
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: ""
  });
  
  // State for avatar
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  // State for password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // State for loading and error
  const [isLoading, setIsLoading] = useState(true);
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get user data from the /api/auth/me endpoint
        const response = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
        const userData = response.data;
        
        // Set form data with user information
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          bio: userData.settings?.profile?.bio || ""
        });
        
        // Set avatar preview if available
        if (userData.settings?.profile?.avatar) {
          setAvatarPreview(userData.settings.profile.avatar);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data. Please try again.");
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

  // Handle avatar click
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setError("Avatar image must be less than 2MB");
        return;
      }
      
      // Check file type
      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        setError("Avatar must be a JPG or PNG image");
        return;
      }
      
      setAvatar(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert file to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage("");
      
      // Convert avatar to base64 if it exists
      let avatarBase64 = null;
      if (avatar) {
        avatarBase64 = await convertFileToBase64(avatar);
      }
      
      // Update user profile using the /api/users/me endpoint
      const profileUpdate = {
        username: formData.username,
        email: formData.email,
        settings: {
          profile: {
            bio: formData.bio,
            // Include avatar as base64 string if available
            ...(avatarBase64 && { avatar: avatarBase64 })
          }
        }
      };
      
      await axios.patch(
        `${API_URL}/users/me`, 
        profileUpdate,
        { withCredentials: true }
      );
      
      setSuccessMessage("Profile updated successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile: " + (error.response?.data?.error || error.message));
      setIsLoading(false);
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

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage("");
      
      // Change password using the /api/password/change endpoint
      await axios.post(
        `${API_URL}/password/change`, 
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
          confirmPassword: passwordData.confirmPassword
        },
        { withCredentials: true }
      );
      
      setSuccessMessage("Password updated successfully");
      
      // Clear password fields
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password: " + (error.response?.data?.message || error.response?.data?.error || error.message));
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.email) {
    return (
      <div className={`${isDark ? 'text-white' : 'text-gray-800'} p-6 text-center`}>
        Loading user information...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Success message */}
      {successMessage && (
        <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} p-4 rounded-lg`}>
          <p className={`${isDark ? 'text-green-200' : 'text-green-600'}`}>{successMessage}</p>
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <div className={`${isDark ? 'bg-red-900' : 'bg-red-100'} p-4 rounded-lg`}>
          <p className={`${isDark ? 'text-red-200' : 'text-red-600'}`}>{error}</p>
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
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/jpeg, image/png"
              />
              
              {/* Avatar preview */}
              <div 
                onClick={handleAvatarClick}
                className="w-32 h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center cursor-pointer overflow-hidden"
              >
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : formData.username ? (
                  <span className="text-4xl text-gray-600">
                    {formData.username.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <span className="text-4xl text-gray-600">U</span>
                )}
              </div>
              
              <button 
                type="button"
                onClick={handleAvatarClick}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm"
              >
                Change Avatar
              </button>
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
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleProfileChange}
                placeholder="email@example.com"
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
                disabled={isLoading || isAvatarLoading}
                className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${(isLoading || isAvatarLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading || isAvatarLoading ? 'Saving...' : 'Save Changes'}
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
          
          {/* Password Requirements */}
          <div className="space-y-2 mt-2">
            <div className="flex items-center">
              <input 
                type="radio" 
                readOnly 
                checked={/[a-z]/.test(passwordData.newPassword)} 
                className={`mr-2 ${/[a-z]/.test(passwordData.newPassword) ? 'text-blue-500' : 'text-gray-400'}`} 
              />
              <span className={`text-sm ${/[a-z]/.test(passwordData.newPassword) ? (isDark ? 'text-blue-400' : 'text-blue-600') : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                One lowercase character
              </span>
            </div>
            
            <div className="flex items-center">
              <input 
                type="radio" 
                readOnly 
                checked={/[A-Z]/.test(passwordData.newPassword)} 
                className={`mr-2 ${/[A-Z]/.test(passwordData.newPassword) ? 'text-blue-500' : 'text-gray-400'}`} 
              />
              <span className={`text-sm ${/[A-Z]/.test(passwordData.newPassword) ? (isDark ? 'text-blue-400' : 'text-blue-600') : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                One uppercase character
              </span>
            </div>
            
            <div className="flex items-center">
              <input 
                type="radio" 
                readOnly 
                checked={/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)} 
                className={`mr-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword) ? 'text-blue-500' : 'text-gray-400'}`} 
              />
              <span className={`text-sm ${/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword) ? (isDark ? 'text-blue-400' : 'text-blue-600') : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                One special character
              </span>
            </div>
            
            <div className="flex items-center">
              <input 
                type="radio" 
                readOnly 
                checked={/\d/.test(passwordData.newPassword)} 
                className={`mr-2 ${/\d/.test(passwordData.newPassword) ? 'text-blue-500' : 'text-gray-400'}`} 
              />
              <span className={`text-sm ${/\d/.test(passwordData.newPassword) ? (isDark ? 'text-blue-400' : 'text-blue-600') : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                One number character
              </span>
            </div>
            
            <div className="flex items-center">
              <input 
                type="radio" 
                readOnly 
                checked={passwordData.newPassword.length >= 8} 
                className={`mr-2 ${passwordData.newPassword.length >= 8 ? 'text-blue-500' : 'text-gray-400'}`} 
              />
              <span className={`text-sm ${passwordData.newPassword.length >= 8 ? (isDark ? 'text-blue-400' : 'text-blue-600') : (isDark ? 'text-gray-400' : 'text-gray-600')}`}>
                At least 8 characters
              </span>
            </div>
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
            {passwordData.newPassword && passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading || 
                !passwordData.currentPassword || 
                !passwordData.newPassword || 
                !passwordData.confirmPassword ||
                passwordData.newPassword !== passwordData.confirmPassword ||
                passwordData.newPassword.length < 8 ||
                !/[a-z]/.test(passwordData.newPassword) ||
                !/[A-Z]/.test(passwordData.newPassword) ||
                !/\d/.test(passwordData.newPassword) ||
                !/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)
              }
              className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ${
                isLoading || 
                !passwordData.currentPassword || 
                !passwordData.newPassword || 
                !passwordData.confirmPassword ||
                passwordData.newPassword !== passwordData.confirmPassword ||
                passwordData.newPassword.length < 8 ||
                !/[a-z]/.test(passwordData.newPassword) ||
                !/[A-Z]/.test(passwordData.newPassword) ||
                !/\d/.test(passwordData.newPassword) ||
                !/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)
                  ? 'opacity-70 cursor-not-allowed' 
                  : ''
              }`}
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}