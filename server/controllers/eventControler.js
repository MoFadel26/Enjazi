const jwt      = require('jsonwebtoken');
const User     = require('../models/userSchema');
const Event = require('../models/eventSchema');
const mongoose = require('mongoose');

exports.createEvent = async function createEvent(req, res) {
  try {
    // Grab the token (from cookie or Authorization header)
    const token =
      // if you set it as an HTTP‐only cookie named "jwt":
      req.cookies?.jwt
      // or, if you’re sending it as a Bearer token:
      || (req.get('Authorization') || '').replace(/^Bearer\s+/i, '');

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Verify & decode
    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = payload.userId;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Bad user ID in token' });
    }

    // Create the Event
    const eventData = {
      title:       req.body.title,
      description: req.body.description,
      priority:    req.body.priority,
      startTime:   req.body.startTime,
      endTime:     req.body.endTime,
      colour:   req.body.completed   || 'blue',
    };

    const newEvent = await Event.create(eventData);

    // Push the Event._id onto the User.event array
    await User.findByIdAndUpdate(
      userId,
      { $push: { events: eventData._id } },
      { new: true }      // return the updated user (optional)
    );

    // Return the created task
    return res.status(201).json(newEvent);

  } catch(err) {
    console.error('Error in createEvent:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
