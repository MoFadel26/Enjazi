// controllers/settingsController.js
const User = require('../models/userSchema');

// Get all settings
exports.getSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('settings');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: user.settings
    });
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update profile settings
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { bio, avatarUrl } = req.body;

    // Build update object with only provided fields
    const updateFields = {};
    
    // Only update fields that are explicitly provided
    if (bio !== undefined) updateFields['settings.profile.bio'] = bio;
    if (avatarUrl !== undefined) updateFields['settings.profile.avatarUrl'] = avatarUrl;
    
    // If no fields to update, return early
    if (Object.keys(updateFields).length === 0) {
      // Just return the current profile
      const currentUser = await User.findById(userId);
      return res.status(200).json({
        status: 'success',
        data: {
          profile: currentUser.settings.profile
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        profile: user.settings.profile
      }
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update appearance settings
exports.updateAppearance = async (req, res) => {
  try {
    const userId = req.user._id;
    const { theme, fontSize, colorScheme } = req.body;

    // Build update object with only provided fields
    const updateFields = {};
    if (theme !== undefined) updateFields['settings.appearance.theme'] = theme;
    if (fontSize !== undefined) updateFields['settings.appearance.fontSize'] = fontSize;
    if (colorScheme !== undefined) updateFields['settings.appearance.colorScheme'] = colorScheme;

    // If no fields to update, return early
    if (Object.keys(updateFields).length === 0) {
      const currentUser = await User.findById(userId);
      return res.status(200).json({
        status: 'success',
        data: {
          appearance: currentUser.settings.appearance
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        appearance: user.settings.appearance
      }
    });
  } catch (error) {
    console.error('Error updating appearance settings:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update pomodoro settings
exports.updatePomodoro = async (req, res) => {
  try {
    const userId = req.user._id;
    const { workDuration, breakDuration, longBreakDuration, longBreakInterval, autoStartBreaks, autoStartPomodoros, sound, volume } = req.body;

    // Build update object with only provided fields
    const updateFields = {};
    if (workDuration !== undefined) updateFields['settings.pomodoro.workDuration'] = workDuration;
    if (breakDuration !== undefined) updateFields['settings.pomodoro.breakDuration'] = breakDuration;
    if (longBreakDuration !== undefined) updateFields['settings.pomodoro.longBreakDuration'] = longBreakDuration;
    if (longBreakInterval !== undefined) updateFields['settings.pomodoro.longBreakInterval'] = longBreakInterval;
    if (autoStartBreaks !== undefined) updateFields['settings.pomodoro.autoStartBreaks'] = autoStartBreaks;
    if (autoStartPomodoros !== undefined) updateFields['settings.pomodoro.autoStartPomodoros'] = autoStartPomodoros;
    if (sound !== undefined) updateFields['settings.pomodoro.sound'] = sound;
    if (volume !== undefined) updateFields['settings.pomodoro.volume'] = volume;

    // If no fields to update, return early
    if (Object.keys(updateFields).length === 0) {
      const currentUser = await User.findById(userId);
      return res.status(200).json({
        status: 'success',
        data: {
          pomodoro: currentUser.settings.pomodoro
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        pomodoro: user.settings.pomodoro
      }
    });
  } catch (error) {
    console.error('Error updating pomodoro settings:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update productivity settings
exports.updateProductivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dailyGoal, weeklyGoal, taskOrder, showCompletedTasks, enableFocusMode } = req.body;

    // Build update object with only provided fields
    const updateFields = {};
    if (dailyGoal !== undefined) updateFields['settings.productivity.dailyGoal'] = dailyGoal;
    if (weeklyGoal !== undefined) updateFields['settings.productivity.weeklyGoal'] = weeklyGoal;
    if (taskOrder !== undefined) updateFields['settings.productivity.taskOrder'] = taskOrder;
    if (showCompletedTasks !== undefined) updateFields['settings.productivity.showCompletedTasks'] = showCompletedTasks;
    if (enableFocusMode !== undefined) updateFields['settings.productivity.enableFocusMode'] = enableFocusMode;

    // If no fields to update, return early
    if (Object.keys(updateFields).length === 0) {
      const currentUser = await User.findById(userId);
      return res.status(200).json({
        status: 'success',
        data: {
          productivity: currentUser.settings.productivity
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        productivity: user.settings.productivity
      }
    });
  } catch (error) {
    console.error('Error updating productivity settings:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update notification settings
exports.updateNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email, push, desktop, sound } = req.body;

    // Build update object with only provided fields
    const updateFields = {};
    if (email !== undefined) updateFields['settings.notifications.email'] = email;
    if (push !== undefined) updateFields['settings.notifications.push'] = push;
    if (desktop !== undefined) updateFields['settings.notifications.desktop'] = desktop;
    if (sound !== undefined) updateFields['settings.notifications.sound'] = sound;

    // If no fields to update, return early
    if (Object.keys(updateFields).length === 0) {
      const currentUser = await User.findById(userId);
      return res.status(200).json({
        status: 'success',
        data: {
          notifications: currentUser.settings.notifications
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        notifications: user.settings.notifications
      }
    });
  } catch (error) {
    console.error('Error updating notification settings:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update integration settings
exports.updateIntegrations = async (req, res) => {
  try {
    const userId = req.user._id;
    const { googleCalendar, slack, notion, todoist, github } = req.body;

    // Build update object with only provided fields
    const updateFields = {};
    if (googleCalendar !== undefined) updateFields['settings.integrations.googleCalendar'] = Boolean(googleCalendar);
    if (slack !== undefined) updateFields['settings.integrations.slack'] = Boolean(slack);
    if (notion !== undefined) updateFields['settings.integrations.notion'] = Boolean(notion);
    if (todoist !== undefined) updateFields['settings.integrations.todoist'] = Boolean(todoist);
    if (github !== undefined) updateFields['settings.integrations.github'] = Boolean(github);

    // If no fields to update, return early
    if (Object.keys(updateFields).length === 0) {
      const currentUser = await User.findById(userId);
      return res.status(200).json({
        status: 'success',
        data: {
          integrations: currentUser.settings.integrations
        }
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        integrations: user.settings.integrations
      }
    });
  } catch (error) {
    console.error('Error updating integration settings:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};