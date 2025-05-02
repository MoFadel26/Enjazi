const mongoose = require('mongoose');
const { Schema } = mongoose;

const productivitySchema = new Schema(
  {
    dailyTasks:          { type: Number, default: 5 },
    focusHours:          { type: Number, default: 4 },
    pomodoroSessions:    { type: Number, default: 8 },
    weekStartDay:        { type: String,
                           enum: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
                           default: 'Mon' },
    defaultTaskDuration: { type: Number, default: 15 },   // minutes
    taskOrder:           { type: String,
                           enum: ['due-asc','due-desc','priority','created'],
                           default: 'due-asc' },
  },
  { _id: false }
);

module.exports = productivitySchema; 