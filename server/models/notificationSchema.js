const mongoose = require('mongoose');
const { Schema } = mongoose;
const emailPrefSchema = require('./emailPrefSchema');
const browserPrefSchema = require('./browserPrefSchema');

const notificationSchema = new Schema(
  {
    email: {
      dailyDigest: { type: Boolean, default: false },
      weeklySummary: { type: Boolean, default: false },
      taskReminders: { type: Boolean, default: false },
      streakUpdates: { type: Boolean, default: false }
    },
    browser: {
      pomodoroTimer: { type: Boolean, default: false },
      taskDueSoon: { type: Boolean, default: false },
      roomUpdates: { type: Boolean, default: false },
      goalAchievements: { type: Boolean, default: false }
    },
    quietHours: {
      enabled: { type: Boolean, default: false },
      from: { type: String, default: '00:00' },
      to: { type: String, default: '06:00' },
    },
  },
  { _id: false }
);

module.exports = notificationSchema; 