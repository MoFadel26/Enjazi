const mongoose = require('mongoose');
const { Schema } = mongoose;
const roomSchema = require('./roomSchema');
const leaderboardSchema = require('./leaderboardSchema');
const settingsSchema = require('./settingsSchema');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, default: '' },
    email:    { type: String, required: true, unique: true, default: '' },
    password: { type: String, required: true, default: '' },

    role:     { type: String, enum: ['admin','user'], default: 'user' },
    admin: {
      permissions: {
        manageUsers:    { type: Boolean, default: false },
        manageRooms:    { type: Boolean, default: false },
        manageTasks:    { type: Boolean, default: false },
        manageSettings: { type: Boolean, default: false },
        viewAnalytics:  { type: Boolean, default: false }
      },
      lastLogin: { type: Date, default: null },
      loginHistory: [{
        timestamp: { type: Date, default: Date.now },
        ip: { type: String },
        device: { type: String }
      }]
    },

    tasks: [ {
      type: Schema.Types.ObjectId,
      ref:  'Task',
      default: []
    }],
    events: [ {
      type: Schema.Types.ObjectId,
      ref:  'Event',
      default: []
    } ],
    rooms:      { type: [roomSchema],  default: [] },

    leaderboard:{ type: leaderboardSchema, default: () => ({}) },
    settings:   { type: settingsSchema,    default: () => ({}) },
  },
  { timestamps: true }
);

// Add method to check if user is admin
userSchema.methods.isAdmin = function() {
  return this.role === 'admin';
};

// Add method to check specific admin permissions
userSchema.methods.hasPermission = function(permission) {
  return this.role === 'admin' && this.admin?.permissions?.[permission] === true;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
