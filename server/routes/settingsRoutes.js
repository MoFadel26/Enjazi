// routes/settingsRoutes.js
const express = require('express');
const { protectRoute } = require('../middleware/protectRoute');
const router = express.Router();

// Import the controller
const {
  getSettings,
  updateAppearance,
  updatePomodoro,
  updateProductivity,
  updateNotifications,
  updateIntegrations,
  updateProfile  // Add this
} = require('../controllers/settingsController');

// GET /api/settings - Get all settings for the logged-in user
router.get('/', protectRoute, getSettings);

// PATCH /api/settings/appearance - Update appearance settings
router.patch('/appearance', protectRoute, updateAppearance);

// PATCH /api/settings/pomodoro - Update pomodoro settings
router.patch('/pomodoro', protectRoute, updatePomodoro);

// PATCH /api/settings/productivity - Update productivity settings
router.patch('/productivity', protectRoute, updateProductivity);

// PATCH /api/settings/notifications - Update notification settings
router.patch('/notifications', protectRoute, updateNotifications);

// PATCH /api/settings/integrations - Update integration settings
router.patch('/integrations', protectRoute, updateIntegrations);

// PATCH /api/settings/profile - Update profile settings
router.patch('/profile', protectRoute, updateProfile);  // Add this

module.exports = router;