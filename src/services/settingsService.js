// src/services/settingsService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configure axios to include credentials (cookies)
axios.defaults.withCredentials = true;

// Get all settings
export const getAllSettings = async () => {
  try {
    const response = await axios.get(`${API_URL}/settings`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update profile settings
export const updateProfile = async (profileData) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/profile`, profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update appearance settings
export const updateAppearance = async (appearanceData) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/appearance`, appearanceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update productivity settings
export const updateProductivity = async (productivityData) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/productivity`, productivityData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update pomodoro settings
export const updatePomodoro = async (pomodoroData) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/pomodoro`, pomodoroData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update notification settings
export const updateNotifications = async (notificationData) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/notifications`, notificationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update integration settings
export const updateIntegrations = async (integrationData) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/integrations`, integrationData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const response = await axios.post(`${API_URL}/password/change`, passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};