const mongoose = require('mongoose');
const { Schema } = mongoose;

const pomodoroSchema = new Schema(
  {
    focusDuration:          { type: Number, default: 25 },
    shortBreak:             { type: Number, default: 5  },
    longBreak:              { type: Number, default: 15 },
    sessionBeforeLongBreak: { type: Number, default: 4  },
    autoStart:              { type: Boolean, default: true },
    autoStartNext:          { type: Boolean, default: true },
    audio: {
      focusEndSound: { type: String, default: 'bell.mp3' },
      breakEndSound: { type: String, default: 'ping.mp3' },
    },
  },
  { _id: false }
);

module.exports = pomodoroSchema; 