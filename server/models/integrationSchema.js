const mongoose = require('mongoose');
const { Schema } = mongoose;

const integrationSchema = new Schema(
  {
    googleCalendar: { type: Boolean, default: false },
    slack:          { type: Boolean, default: false },
    notion:         { type: Boolean, default: false },
  },
  { _id: false }
);

module.exports = integrationSchema; 