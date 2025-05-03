// models/RoomSchema.js
const mongoose = require('mongoose');
const { Schema } = mongoose;
const messageSchema = require('./MessageSchema');

const roomSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }],
  announcement: {
    type: String,
    default: ''
  },
  messages: {
    type: [messageSchema],
    default: []
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  enrolledUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Room', roomSchema);
