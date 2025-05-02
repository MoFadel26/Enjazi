const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new Schema(
  {
    title:       { type: String,  required: true, default: '' },
    priority:    { type: String,  enum: ['High','Medium','Low'], required: true, default: 'Medium' },
    description: { type: String,  required: true, default: '' },
    startTime:   { type: Date,    required: true, default: () => new Date() },
    endTime:     { type: Date,    required: true, default: () => new Date() },
    colour:      { type: String,  enum: ['red','blue','green','purple','yellow'], default: 'blue' },
  },
  { _id: false }
);

const messageSchema = new Schema(
  {
    userId:    { type: String, required: true, default: '' },
    username:  { type: String, required: true, default: '' },
    content:   { type: String, required: true, default: '' },
    timestamp: { type: String, required: true, default: () => new Date().toISOString() },
  },
  { _id: false }
);

const roomSchema = new Schema(
  {
    title:        { type: String,  required: true, default: '' },
    description:  { type: String,  required: true, default: '' },
    tasks:        [{ type: Schema.Types.ObjectId, ref: 'Task', default: [] }],
    announcement: { type: String,  default: '' },
    messages:     { type: [messageSchema], default: [] },
    isEnrolled:   { type: Boolean, default: false },
  },
  { _id: false }
);

const leaderboardSchema = new Schema(
  {
    // username: { type: String, required: true, default: '' },
    points:   { type: Number, default: 0 },
    streak:   { type: Number, default: 0 },
    hours:    { type: Number, default: 0 },
    rank:     { type: Number, default: 0 },
  },
  { _id: false }
);

const profileSchema = new Schema(
  {
    avatarUrl: { type: String, default: '' },
    FName:     { type: String, default: '' },
    LName:     { type: String, default: '' },
    bio:       { type: String, default: '' },
  },
  { _id: false }
);

const appearanceSchema = new Schema(
  {
    colorTheme:  { type: String, enum: ['light','dark'], default: 'light' },
    accentColor: { type: String, enum: ['blue','red','green','purple','orange'], default: 'blue' },
    fontSize:    { type: String, enum: ['small','medium','large'], default: 'medium' },
    animation:   { type: Boolean, default: true },
  },
  { _id: false }
);

const pomodoroSchema = new Schema(
  {
    focusDuration:          { type: Number, default: 25 },
    shortBreak:             { type: Number, default: 5  },
    longBreak:              { type: Number, default: 15 },
    sessionBeforeLongBreak: { type: Number, default: 4  },
    autoStart:              { type: Boolean, default: true },
    autoStartNext:          { type: Boolean, default: true },
    audio: {
      focusEndSound: { type: String, default: 'bell.mp3' },
      breakEndSound: { type: String, default: 'ping.mp3' },
    },
  },
  { _id: false }
);

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

const emailPrefSchema = new Schema(
  {
    dailyDigest:   { type: Boolean, default: true },
    weeklySummary: { type: Boolean, default: true },
    taskReminder:  { type: Boolean, default: true },
    streakUpdate:  { type: Boolean, default: true },
  },
  { _id: false }
);

const browserPrefSchema = new Schema(
  {
    pomodoroEnd:     { type: Boolean, default: true },
    taskDueSoon:     { type: Boolean, default: true },
    roomUpdates:     { type: Boolean, default: false },
    goalAchievements:{ type: Boolean, default: false },
  },
  { _id: false }
);

const notificationSchema = new Schema(
  {
    email:   { type: emailPrefSchema,    default: () => ({}) },
    browser: { type: browserPrefSchema, default: () => ({}) },
    quietHours: {
      enabled:{ type: Boolean, default: false },
      from:   { type: String,   default: '00:00' },
      to:     { type: String,   default: '06:00' },
    },
  },
  { _id: false }
);

const integrationSchema = new Schema(
  {
    googleCalendar: { type: Boolean, default: false },
    slack:          { type: Boolean, default: false },
    notion:         { type: Boolean, default: false },
  },
  { _id: false }
);

const settingsSchema = new Schema(
  {
    profile:       { type: profileSchema,       default: () => ({}) },
    appearance:    { type: appearanceSchema,    default: () => ({}) },
    pomodoro:      { type: pomodoroSchema,      default: () => ({}) },
    productivity:  { type: productivitySchema,  default: () => ({}) },
    notifications: { type: notificationSchema,  default: () => ({}) },
    integrations:  { type: integrationSchema,   default: () => ({}) },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, default: '' },
    email:    { type: String, required: true, unique: true, default: '' },
    password: { type: String, required: true, default: '' },

    role:     { type: String, enum: ['admin','user'], default: 'user' },

    tasks: [ {
      type: Schema.Types.ObjectId,
      ref:  'Task',
      default: []
    } ],
    events:     { type: [eventSchema], default: [] },
    rooms:      { type: [roomSchema],  default: [] },

    leaderboard:{ type: leaderboardSchema, default: () => ({}) },
    settings:   { type: settingsSchema,    default: () => ({}) },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
