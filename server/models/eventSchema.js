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

module.exports = eventSchema; 