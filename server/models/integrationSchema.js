const mongoose = require('mongoose');
const { Schema } = mongoose;

const integrationSchema = new Schema(
  {
    // Calendar Integrations
    googleCalendar: { type: Boolean, default: false },
    notion: { type: Boolean, default: false },
    todoist: { type: Boolean, default: false },
    
    // Collaboration Tools
    slack: { type: Boolean, default: false },
    github: { type: Boolean, default: false },
  },
  { _id: false }
);

module.exports = integrationSchema;