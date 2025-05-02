const mongoose = require('mongoose');
const { Schema } = mongoose;
const messageSchema = require('./messageSchema');

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

module.exports = roomSchema; 