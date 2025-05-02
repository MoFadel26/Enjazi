const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  category: { type: String, required: true },
  dueDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const eventSchema = new Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  colour: { type: String, enum: ['red', 'blue', 'green', 'purple', 'yellow'], required: true },
});

const messageSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
});

const roomSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  announcement: { type: String },
  messages: [messageSchema],
  isEnrolled: { type: Boolean, default: false },
});

const leaderboardSchema = new Schema({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  points: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  hours: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
});

const appearanceSchema = new Schema({
  colorTheme: { type: String, enum: ['light', 'dark'], default: 'light' },
  accentColor: { type: String, default: 'blue' },
});

const pomodoroSchema = new Schema({
  focusDuration: { type: Number, required: true }, // minutes
  shortBreak: { type: Number, required: true },   // minutes
  longBreak: { type: Number, required: true },    // minutes
  sessionBeforeLongBreak: { type: Number, required: true },
  autoStartOptions: {
    autoStart: { type: Boolean, default: true },
    autoStartNext: { type: Boolean, default: true },
  },
});

const settingsSchema = new Schema({
  appearance: appearanceSchema,
  pomodoro: pomodoroSchema,
});

const userSchema = new Schema({
  userID: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  FName: { type: String, optional: true },
  LName: { type: String, optional: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [taskSchema],
  events: [eventSchema],
  rooms: [roomSchema],
  leaderboard: leaderboardSchema,
  settings: settingsSchema,
});

const User = mongoose.model('User', userSchema);

module.exports = User;