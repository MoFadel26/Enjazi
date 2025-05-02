const mongoose = require('mongoose');
const { Schema } = mongoose;

const appearanceSchema = new Schema(
  {
    colorTheme:  { type: String, enum: ['light','dark'], default: 'light' },
    accentColor: { type: String, enum: ['blue','red','green','purple','orange'], default: 'blue' },
    fontSize:    { type: String, enum: ['small','medium','large'], default: 'medium' },
    animation:   { type: Boolean, default: true },
  },
  { _id: false }
);

module.exports = appearanceSchema; 