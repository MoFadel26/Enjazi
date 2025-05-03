const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');
const User  = require('../models/userSchema');
const Event = require('../models/eventSchema');

/* ---------- helpers ------------------------------------ */
function getToken(req) {
  return (
    req.cookies?.jwt || // cookie
    (req.get('Authorization') || '') // Bearer
      .replace(/^Bearer\s+/i, '')
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

//POST/api/events --> For adding
exports.createEvent = async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    let payload;
    try { payload = verifyToken(token); }
    catch { return res.status(401).json({ error: 'Invalid token' }); }

    const userId = payload.userId;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).json({ error: 'Bad user ID in token' });

    /* Build doc */
    const eventData = {
      title      : req.body.title,
      description: req.body.description,
      priority   : req.body.priority,
      startTime  : req.body.startTime,
      endTime    : req.body.endTime,
      colour     : req.body.colour || 'blue'
    };

    const newEvent = await Event.create(eventData);

    /* add reference to user */
    await User.findByIdAndUpdate(
      userId,
      { $push: { events: newEvent._id } }
    );

    res.status(201).json(newEvent);
  } catch (err) {
    console.error('createEvent →', err);
    res.status(500).json({ error: 'Server error' });
  }
};

//PATCH /api/events/:id  --> For update
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: 'Bad event id' });

    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    try { verifyToken(token); }
    catch { return res.status(401).json({ error: 'Invalid token' }); }

    const body = { ...req.body };
    delete body._id; // disallow id overwrite

    const updated = await Event.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.json(updated);
  } catch (err) {
    console.error('updateEvent →', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /api/events/:id --> for deleting
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: 'Bad event id' });

    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    try { verifyToken(token); }
    catch { return res.status(401).json({ error: 'Invalid token' }); }

    const event = await Event.findByIdAndDelete(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    await User.updateMany(
      { events: event._id },
      { $pull: { events: event._id } }
    );

    res.status(204).send();
  } catch (err) {
    console.error('deleteEvent →', err);
    res.status(500).json({ error: 'Server error' });
  }
};