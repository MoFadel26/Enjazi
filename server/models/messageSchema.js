const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    userId:    { type: String, required: true, default: '' },
    username:  { type: String, required: true, default: '' },
    content:   { type: String, required: true, default: '' },
    timestamp: { type: String, required: true, default: () => new Date().toISOString() },
  },
  { _id: false }
);

module.exports = messageSchema; 