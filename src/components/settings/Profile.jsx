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

        const response = await axios.get(`${API_URL}/users/me`, { withCredentials: true });
        const userData = response.data;

        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          bio: userData.settings?.profile?.bio || ""
        });

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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarClick = () => {
    setError(null);
    fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError(null);

    try {
      if (file.size > 2 * 1024 * 1024) {
        throw new Error("Avatar image must be less than 2MB");
      }

      if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        throw new Error("Avatar must be a JPG or PNG image");
      }

      setAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setIsAvatarLoading(true);
      await axios.patch(
        `${API_URL}/users/me`,
        { settings: { profile: { avatar: null } } },
        { withCredentials: true }
      );
      setAvatar(null);
      setAvatarPreview(null);
      setSuccessMessage("Avatar removed successfully");
    } catch (err) {
      setError("Failed to remove avatar");
    } finally {
      setIsAvatarLoading(false);
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage("");

      let avatarBase64 = avatarPreview;
      if (avatar) {
        avatarBase64 = await convertFileToBase64(avatar);
      }

      const profileUpdate = {
        username: formData.username,
        email: formData.email,
        settings: {
          profile: {
            bio: formData.bio,
            avatar: avatarBase64
          }
        }
      };

      const response = await axios.patch(
        `${API_URL}/users/me`, 
        profileUpdate,
        { withCredentials: true }
      );

      // Update avatar preview from response if available
      if (response.data.settings?.profile?.avatar) {
        setAvatarPreview(response.data.settings.profile.avatar);
      }

      setSuccessMessage("Profile updated successfully");
      setAvatar(null); // Clear the selected file after successful upload
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile: " + (error.response?.data?.error || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError(null);
      setSuccessMessage("");

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
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError("Failed to update password: " + (error.response?.data?.message || error.response?.data?.error || error.message));
    } finally {
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
      {successMessage && (
        <div className={`${isDark ? 'bg-green-900' : 'bg-green-100'} p-4 rounded-lg`}>
          <p className={`${isDark ? 'text-green-200' : 'text-green-600'}`}>{successMessage}</p>
        </div>
      )}

      {error && (
        <div className={`${isDark ? 'bg-red-900' : 'bg-red-100'} p-4 rounded-lg`}>
          <p className={`${isDark ? 'text-red-200' : 'text-red-600'}`}>{error}</p>
        </div>
      )}

      <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Profile Information</h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
          Update your personal information and how others see you on the platform.
        </p>

        <form onSubmit={handleProfileSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="flex flex-col items-center justify-center h-full">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                className="hidden"
                accept="image/jpeg, image/png"
              />
              
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
                disabled={isAvatarLoading}
              >
                {isAvatarLoading ? 'Processing...' : 'Change Avatar'}
              </button>
              
              {avatarPreview && (
                <button 
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm mt-2"
                  disabled={isAvatarLoading}
                >
                  Remove Avatar
                </button>
              )}
              
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>PNG, JPG up to 2MB</p>
            </div>
          </div>

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

      {/* Password section */}
      <div className={`${isDark ? 'bg-gray-900 text-white' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>Change Password</h2>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-6`}>
          Update your password.
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
