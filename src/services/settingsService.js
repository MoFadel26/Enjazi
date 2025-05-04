// src/services/settingsService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Configure axios to always include credentials
axios.defaults.withCredentials = true;

// Get all settings
const getSettings = async () => {
  try {
    const response = await axios.get(`${API_URL}/settings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
};

// Update pomodoro settings
const updatePomodoro = async (pomodoroSettings) => {
  try {
    // Make sure we're sending the exact structure the backend expects
    const payload = {
      focusDuration: Number(pomodoroSettings.focusDuration),
      shortBreak: Number(pomodoroSettings.shortBreak),
      longBreak: Number(pomodoroSettings.longBreak),
      sessionBeforeLongBreak: Number(pomodoroSettings.sessionBeforeLongBreak),
      autoStart: Boolean(pomodoroSettings.autoStart),
      autoStartNext: Boolean(pomodoroSettings.autoStartNext),
      audio: {
        focusEndSound: pomodoroSettings.audio?.focusEndSound || 'bell.mp3',
        breakEndSound: pomodoroSettings.audio?.breakEndSound || 'ping.mp3'
      }
    };
    
    console.log('Sending pomodoro settings:', payload);
    const response = await axios.patch(`${API_URL}/settings/pomodoro`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating pomodoro settings:', error);
    throw error;
  }
};

// Update appearance settings
const updateAppearance = async (appearanceSettings) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/appearance`, appearanceSettings);
    return response.data;
  } catch (error) {
    console.error('Error updating appearance settings:', error);
    throw error;
  }
};

// Update productivity settings
const updateProductivity = async (productivitySettings) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/productivity`, productivitySettings);
    return response.data;
  } catch (error) {
    console.error('Error updating productivity settings:', error);
    throw error;
  }
};

// Update notification settings
const updateNotifications = async (notificationSettings) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/notifications`, notificationSettings);
    return response.data;
  } catch (error) {
    console.error('Error updating notification settings:', error);
    throw error;
  }
};

// Update integration settings
const updateIntegrations = async (integrationSettings) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/integrations`, integrationSettings);
    return response.data;
  } catch (error) {
    console.error('Error updating integration settings:', error);
    throw error;
  }
};

// Update profile settings
const updateProfile = async (profileSettings) => {
  try {
    const response = await axios.patch(`${API_URL}/settings/profile`, profileSettings);
    return response.data;
  } catch (error) {
    console.error('Error updating profile settings:', error);
    throw error;
  }
};

const settingsService = {
  getSettings,
  updatePomodoro,
  updateAppearance,
  updateProductivity,
  updateNotifications,
  updateIntegrations,
  updateProfile
};

export default settingsService;