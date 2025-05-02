const mongoose = require('mongoose');
const { Schema } = mongoose;

const browserPrefSchema = new Schema(
  {
    pomodoroEnd:     { type: Boolean, default: true },
    taskDueSoon:     { type: Boolean, default: true },
    roomUpdates:     { type: Boolean, default: false },
    goalAchievements:{ type: Boolean, default: false },
  },
  { _id: false }
);

module.exports = browserPrefSchema; 