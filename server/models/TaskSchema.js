// models/Task.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title:       { type: String, required: true, default: '' },
  description: { type: String, default: '' },
  priority:    { type: String, enum: ['High','Medium','Low'], default: 'Medium' },
  category:    { type: String, default: 'Work' },
  dueDate:     { type: Date,   default: () => new Date() },
  startTime:   { type: String, default: '09:00' },
  endTime:     { type: String, default: '10:00' },
  completed:   { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
