const mongoose = require('mongoose');
const { Schema } = mongoose;
const profileSchema = require('./profileSchema');
const appearanceSchema = require('./appearanceSchema');
const pomodoroSchema = require('./pomodoroSchema');
const productivitySchema = require('./productivitySchema');
const notificationSchema = require('./notificationSchema');
const integrationSchema = require('./integrationSchema');

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

module.exports = settingsSchema; 