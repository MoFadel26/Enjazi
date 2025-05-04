// controllers/settingsController.js
const User = require('../models/userSchema');

// Get all settings
exports.getSettings = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

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
    console.error('Error fetching settings:', error);
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
    const { FName, LName, bio, avatarUrl } = req.body;

    // Check if there are valid fields to update
    if (!FName && !LName && !bio && !avatarUrl) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }

    // Build update object with only provided fields
    const updateFields = {};
    if (FName !== undefined) updateFields['settings.profile.FName'] = FName;
    if (LName !== undefined) updateFields['settings.profile.LName'] = LName;
    if (bio !== undefined) updateFields['settings.profile.bio'] = bio;
    if (avatarUrl !== undefined) updateFields['settings.profile.avatarUrl'] = avatarUrl;

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
    const { theme, accentColor, fontSize, compactMode } = req.body;

    // Check if there are valid fields to update
    if (!theme && !accentColor && fontSize === undefined && compactMode === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }

    // Build update object with only provided fields
    const updateFields = {};
    if (theme !== undefined) updateFields['settings.appearance.theme'] = theme;
    if (accentColor !== undefined) updateFields['settings.appearance.accentColor'] = accentColor;
    if (fontSize !== undefined) updateFields['settings.appearance.fontSize'] = fontSize;
    if (compactMode !== undefined) updateFields['settings.appearance.compactMode'] = compactMode;

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
    console.error('Error updating appearance:', error);
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
    const { workDuration, breakDuration, longBreakDuration, longBreakInterval, autoStartBreaks, autoStartPomodoros } = req.body;

    // Check if there are valid fields to update
    if (workDuration === undefined && 
        breakDuration === undefined && 
        longBreakDuration === undefined && 
        longBreakInterval === undefined && 
        autoStartBreaks === undefined && 
        autoStartPomodoros === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }

    // Build update object with only provided fields
    const updateFields = {};
    if (workDuration !== undefined) updateFields['settings.pomodoro.workDuration'] = workDuration;
    if (breakDuration !== undefined) updateFields['settings.pomodoro.breakDuration'] = breakDuration;
    if (longBreakDuration !== undefined) updateFields['settings.pomodoro.longBreakDuration'] = longBreakDuration;
    if (longBreakInterval !== undefined) updateFields['settings.pomodoro.longBreakInterval'] = longBreakInterval;
    if (autoStartBreaks !== undefined) updateFields['settings.pomodoro.autoStartBreaks'] = autoStartBreaks;
    if (autoStartPomodoros !== undefined) updateFields['settings.pomodoro.autoStartPomodoros'] = autoStartPomodoros;

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
    const { dailyTasks, focusHours, pomodoroSessions, weekStartDay, defaultTaskDuration, taskOrder } = req.body;

    // Check if there are valid fields to update
    if (dailyTasks === undefined && 
        focusHours === undefined && 
        pomodoroSessions === undefined && 
        weekStartDay === undefined && 
        defaultTaskDuration === undefined && 
        taskOrder === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }

    // Build update object with only provided fields
    const updateFields = {};
    if (dailyTasks !== undefined) updateFields['settings.productivity.dailyTasks'] = dailyTasks;
    if (focusHours !== undefined) updateFields['settings.productivity.focusHours'] = focusHours;
    if (pomodoroSessions !== undefined) updateFields['settings.productivity.pomodoroSessions'] = pomodoroSessions;
    if (weekStartDay !== undefined) updateFields['settings.productivity.weekStartDay'] = weekStartDay;
    if (defaultTaskDuration !== undefined) updateFields['settings.productivity.defaultTaskDuration'] = defaultTaskDuration;
    if (taskOrder !== undefined) updateFields['settings.productivity.taskOrder'] = taskOrder;

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
    const { email, browser, quietHours } = req.body;

    // Check if there are valid fields to update
    if (!email && !browser && !quietHours) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }

    // Build update object with only provided fields
    const updateFields = {};
    
    // Handle email notification settings
    if (email) {
      if (email.dailyDigest !== undefined) updateFields['settings.notifications.email.dailyDigest'] = email.dailyDigest;
      if (email.weeklySummary !== undefined) updateFields['settings.notifications.email.weeklySummary'] = email.weeklySummary;
      if (email.taskReminders !== undefined) updateFields['settings.notifications.email.taskReminders'] = email.taskReminders;
      if (email.streakUpdates !== undefined) updateFields['settings.notifications.email.streakUpdates'] = email.streakUpdates;
    }
    
    // Handle browser notification settings
    if (browser) {
      if (browser.pomodoroTimer !== undefined) updateFields['settings.notifications.browser.pomodoroTimer'] = browser.pomodoroTimer;
      if (browser.taskDueSoon !== undefined) updateFields['settings.notifications.browser.taskDueSoon'] = browser.taskDueSoon;
      if (browser.roomUpdates !== undefined) updateFields['settings.notifications.browser.roomUpdates'] = browser.roomUpdates;
      if (browser.goalAchievements !== undefined) updateFields['settings.notifications.browser.goalAchievements'] = browser.goalAchievements;
    }
    
    // Handle quiet hours settings
    if (quietHours) {
      if (quietHours.enabled !== undefined) updateFields['settings.notifications.quietHours.enabled'] = quietHours.enabled;
      if (quietHours.from !== undefined) updateFields['settings.notifications.quietHours.from'] = quietHours.from;
      if (quietHours.to !== undefined) updateFields['settings.notifications.quietHours.to'] = quietHours.to;
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
    const { googleCalendar, notion, todoist, slack, github } = req.body;

    // Check if there are valid fields to update
    if (googleCalendar === undefined && 
        notion === undefined && 
        todoist === undefined && 
        slack === undefined && 
        github === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'No valid fields to update'
      });
    }

    // Build update object with only provided fields
    const updateFields = {};
    if (googleCalendar !== undefined) updateFields['settings.integrations.googleCalendar'] = googleCalendar;
    if (notion !== undefined) updateFields['settings.integrations.notion'] = notion;
    if (todoist !== undefined) updateFields['settings.integrations.todoist'] = todoist;
    if (slack !== undefined) updateFields['settings.integrations.slack'] = slack;
    if (github !== undefined) updateFields['settings.integrations.github'] = github;

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

// Get appearance settings
exports.getAppearanceSettings = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user.settings.appearance || {});
    } catch (error) {
      console.error('Error getting appearance settings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Update appearance settings
exports.updateAppearanceSettings = async (req, res) => {
    try {
      const { colorTheme, accentColor, fontSize, animation } = req.body;
      
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Ensure settings objects exist
      if (!user.settings) user.settings = {};
      if (!user.settings.appearance) user.settings.appearance = {};
      
      // Update appearance settings
      if (colorTheme) user.settings.appearance.colorTheme = colorTheme;
      if (accentColor) user.settings.appearance.accentColor = accentColor;
      if (fontSize) user.settings.appearance.fontSize = fontSize;
      if (animation !== undefined) user.settings.appearance.animation = animation;
      
      await user.save();
      
      res.json(user.settings.appearance);
    } catch (error) {
      console.error('Error updating appearance settings:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };