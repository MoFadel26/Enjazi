// models/integrationSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const integrationSchema = new Schema(
  {
    googleCalendar: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String },
      refreshToken: { type: String },
      expiresAt: { type: Date },
      email: { type: String }
    },
    slack: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String },
      teamId: { type: String },
      teamName: { type: String },
      userId: { type: String }
    },
    notion: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String },
      workspaceId: { type: String },
      workspaceName: { type: String }
    },
    todoist: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String },
      userId: { type: String }
    },
    github: {
      connected: { type: Boolean, default: false },
      accessToken: { type: String },
      username: { type: String }
    }
  },
  { _id: false }
);

module.exports = integrationSchema;