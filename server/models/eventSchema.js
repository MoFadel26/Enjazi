const mongoose = require('mongoose');
const { Schema } = mongoose;
const eventSchema = new Schema(
  {
    title:       { type: String,  required: true, default: '' },
    priority:    { type: String,  enum: ['High','Medium','Low'], default: 'Medium' },
    description: { type: String, default: '' },
    startTime: { type: Date, required: true },
    endTime  : { type: Date,  required: true},
    colour:      { type: String,  enum: ['red','blue','green','purple','yellow','orange','pink','gray','indigo','teal'], default: 'blue' },
  }, { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
