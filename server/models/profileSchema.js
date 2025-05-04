const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    avatar: { type: String, default: '' },
    FName:     { type: String, default: '' },
    LName:     { type: String, default: '' },
    bio:       { type: String, default: '' },
  },
  { _id: false }
);

module.exports = profileSchema; 