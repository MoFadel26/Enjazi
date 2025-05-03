// controllers/settingsController.js
const User = require('../models/userSchema');

// Get all settings for the logged-in user
exports.getSettings = async (req, res) => {
  try {
    // req.user is already populated by the protectRoute middleware
    res.status(200).json({
      status: 'success',
      data: req.user.settings
    });
  } catch (error) {
    console.error("Error getting settings:", error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update profile settings
exports.updateProfile = async (req, res) => {
  try {
    const { FName, LName, bio, avatarUrl } = req.body;
    
    // Create update object with only provided fields
    const updateFields = {};
    if (FName !== undefined) updateFields['settings.profile.FName'] = FName;
    if (LName !== undefined) updateFields['settings.profile.LName'] = LName;
    if (bio !== undefined) updateFields['settings.profile.bio'] = bio;
    if (avatarUrl !== undefined) updateFields['settings.profile.avatarUrl'] = avatarUrl;
    
    // Only update if there are fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }
    
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        profile: updatedUser.settings.profile
      }
    });
  } catch (error) {
    console.error('Error updating profile settings:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update appearance settings
exports.updateAppearance = async (req, res) => {
  try {
    const { colorTheme, accentColor, fontSize, animation } = req.body;
    
    // Update only the fields that are provided
    const updateFields = {};
    if (colorTheme !== undefined) updateFields['settings.appearance.colorTheme'] = colorTheme;
    if (accentColor !== undefined) updateFields['settings.appearance.accentColor'] = accentColor;
    if (fontSize !== undefined) updateFields['settings.appearance.fontSize'] = fontSize;
    if (animation !== undefined) updateFields['settings.appearance.animation'] = animation;
    
    // Only update if there are fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }
    
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        appearance: updatedUser.settings.appearance
      }
    });
  } catch (error) {
    console.error("Error updating appearance:", error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update pomodoro settings
exports.updatePomodoro = async (req, res) => {
  try {
    const { 
      focusDuration, 
      shortBreak, 
      longBreak, 
      sessionBeforeLongBreak, 
      autoStart, 
      autoStartNext,
      audio 
    } = req.body;
    
    // Update only the fields that are provided
    const updateFields = {};
    if (focusDuration !== undefined) updateFields['settings.pomodoro.focusDuration'] = focusDuration;
    if (shortBreak !== undefined) updateFields['settings.pomodoro.shortBreak'] = shortBreak;
    if (longBreak !== undefined) updateFields['settings.pomodoro.longBreak'] = longBreak;
    if (sessionBeforeLongBreak !== undefined) updateFields['settings.pomodoro.sessionBeforeLongBreak'] = sessionBeforeLongBreak;
    if (autoStart !== undefined) updateFields['settings.pomodoro.autoStart'] = autoStart;
    if (autoStartNext !== undefined) updateFields['settings.pomodoro.autoStartNext'] = autoStartNext;
    
    // Update audio settings if provided
    if (audio) {
      if (audio.focusEndSound !== undefined) updateFields['settings.pomodoro.audio.focusEndSound'] = audio.focusEndSound;
      if (audio.breakEndSound !== undefined) updateFields['settings.pomodoro.audio.breakEndSound'] = audio.breakEndSound;
    }
    
    // Only update if there are fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }
    
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        pomodoro: updatedUser.settings.pomodoro
      }
    });
  } catch (error) {
    console.error("Error updating pomodoro settings:", error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update productivity settings
exports.updateProductivity = async (req, res) => {
  try {
    const { 
      dailyTasks, 
      focusHours, 
      pomodoroSessions, 
      weekStartDay, 
      defaultTaskDuration, 
      taskOrder 
    } = req.body;
    
    // Update only the fields that are provided
    const updateFields = {};
    if (dailyTasks !== undefined) updateFields['settings.productivity.dailyTasks'] = dailyTasks;
    if (focusHours !== undefined) updateFields['settings.productivity.focusHours'] = focusHours;
    if (pomodoroSessions !== undefined) updateFields['settings.productivity.pomodoroSessions'] = pomodoroSessions;
    if (weekStartDay !== undefined) updateFields['settings.productivity.weekStartDay'] = weekStartDay;
    if (defaultTaskDuration !== undefined) updateFields['settings.productivity.defaultTaskDuration'] = defaultTaskDuration;
    if (taskOrder !== undefined) updateFields['settings.productivity.taskOrder'] = taskOrder;
    
    // Only update if there are fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }
    
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        productivity: updatedUser.settings.productivity
      }
    });
  } catch (error) {
    console.error("Error updating productivity settings:", error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update notification settings
exports.updateNotifications = async (req, res) => {
  try {
    const { email, browser, quietHours } = req.body;
    
    // Update only the fields that are provided
    const updateFields = {};
    
    // Update email notification settings
    if (email) {
      if (email.dailyDigest !== undefined) updateFields['settings.notifications.email.dailyDigest'] = email.dailyDigest;
      if (email.weeklySummary !== undefined) updateFields['settings.notifications.email.weeklySummary'] = email.weeklySummary;
      if (email.taskReminder !== undefined) updateFields['settings.notifications.email.taskReminder'] = email.taskReminder;
      if (email.streakUpdate !== undefined) updateFields['settings.notifications.email.streakUpdate'] = email.streakUpdate;
    }
    
    // Update browser notification settings
    if (browser) {
      if (browser.pomodoroEnd !== undefined) updateFields['settings.notifications.browser.pomodoroEnd'] = browser.pomodoroEnd;
      if (browser.taskDueSoon !== undefined) updateFields['settings.notifications.browser.taskDueSoon'] = browser.taskDueSoon;
      if (browser.roomUpdates !== undefined) updateFields['settings.notifications.browser.roomUpdates'] = browser.roomUpdates;
      if (browser.goalAchievements !== undefined) updateFields['settings.notifications.browser.goalAchievements'] = browser.goalAchievements;
    }
    
    // Update quiet hours settings
    if (quietHours) {
      if (quietHours.enabled !== undefined) updateFields['settings.notifications.quietHours.enabled'] = quietHours.enabled;
      if (quietHours.from !== undefined) updateFields['settings.notifications.quietHours.from'] = quietHours.from;
      if (quietHours.to !== undefined) updateFields['settings.notifications.quietHours.to'] = quietHours.to;
    }
    
    // Only update if there are fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }
    
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        notifications: updatedUser.settings.notifications
      }
    });
  } catch (error) {
    console.error("Error updating notification settings:", error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update integration settings
exports.updateIntegrations = async (req, res) => {
  try {
    const { googleCalendar, slack, notion } = req.body;
    
    // Update only the fields that are provided
    const updateFields = {};
    if (googleCalendar !== undefined) updateFields['settings.integrations.googleCalendar'] = googleCalendar;
    if (slack !== undefined) updateFields['settings.integrations.slack'] = slack;
    if (notion !== undefined) updateFields['settings.integrations.notion'] = notion;
    
    // Only update if there are fields to update
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }
    
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        integrations: updatedUser.settings.integrations
      }
    });
  } catch (error) {
    console.error("Error updating integration settings:", error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};