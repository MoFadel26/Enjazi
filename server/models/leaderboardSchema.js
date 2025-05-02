const mongoose = require('mongoose');
const { Schema } = mongoose;

const leaderboardSchema = new Schema(
  {
    points:   { type: Number, default: 0 },
    streak:   { type: Number, default: 0 },
    hours:    { type: Number, default: 0 },
    rank:     { type: Number, default: 0 },
  },
  { _id: false }
);

module.exports = leaderboardSchema; 