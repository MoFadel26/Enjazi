const mongoose = require('mongoose');
const { Schema } = mongoose;

const emailPrefSchema = new Schema(
  {
    dailyDigest:   { type: Boolean, default: true },
    weeklySummary: { type: Boolean, default: true },
    taskReminder:  { type: Boolean, default: true },
    streakUpdate:  { type: Boolean, default: true },
  },
  { _id: false }
);

module.exports = emailPrefSchema; 