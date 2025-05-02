const mongoose = require('mongoose');
const { Schema } = mongoose;
const emailPrefSchema = require('./emailPrefSchema');
const browserPrefSchema = require('./browserPrefSchema');

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

module.exports = notificationSchema; 