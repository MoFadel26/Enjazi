const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Room = require('../models/RoomSchema');

function getToken(req) {
  return (
    req.cookies?.jwt ||
    (req.get('Authorization') || '').replace(/^Bearer\s+/i, '')
  );
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

// GET /api/rooms/public
exports.getPublicRooms = async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    try { verifyToken(token); } catch { return res.status(401).json({ error: 'Invalid token' }); }

    const rooms = await Room.find({ isPublic: true });
    res.json(rooms);
  } catch (err) {
    console.error('getPublicRooms:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/rooms/enrolled
exports.getEnrolledRooms = async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    let payload;
    try { payload = verifyToken(token); } catch { return res.status(401).json({ error: 'Invalid token' }); }

    const rooms = await Room.find({ enrolledUsers: payload.userId });
    res.json(rooms);
  } catch (err) {
    console.error('getEnrolledRooms:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/rooms/:id
exports.getRoomById = async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    try { verifyToken(token); } catch { return res.status(401).json({ error: 'Invalid token' }); }

    const room = await Room.findById(req.params.id)
      .populate('tasks')
      .populate('enrolledUsers', 'username email');

    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    console.error('getRoomById:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/rooms
exports.createRoom = async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    let payload;
    try { payload = verifyToken(token); } catch { return res.status(401).json({ error: 'Invalid token' }); }

    const userId = payload.userId;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).json({ error: 'Bad user ID in token' });

    const room = await Room.create({
      title: req.body.title,
      description: req.body.description,
      isPublic: req.body.isPublic,
      creator: userId,
      enrolledUsers: [userId],
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { rooms: room._id }
    });

    res.status(201).json(room);
  } catch (err) {
    console.error('createRoom:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PATCH /api/rooms/:id/join
exports.joinRoom = async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    let payload;
    try { payload = verifyToken(token); } catch { return res.status(401).json({ error: 'Invalid token' }); }

    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    if (!room.enrolledUsers.includes(payload.userId)) {
      room.enrolledUsers.push(payload.userId);
      await room.save();
    }

    await User.findByIdAndUpdate(payload.userId, {
      $addToSet: { rooms: room._id }
    });

    res.status(200).json({ message: 'Joined room successfully' });
  } catch (err) {
    console.error('joinRoom:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PATCH /api/rooms/:id/leave
exports.leaveRoom = async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    let payload;
    try { payload = verifyToken(token); } catch { return res.status(401).json({ error: 'Invalid token' }); }

    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    room.enrolledUsers = room.enrolledUsers.filter(
      id => id.toString() !== payload.userId
    );
    await room.save();

    await User.findByIdAndUpdate(payload.userId, {
      $pull: { rooms: room._id }
    });

    res.status(200).json({ message: 'Left room successfully' });
  } catch (err) {
    console.error('leaveRoom:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// PUT /api/rooms/:id
exports.updateRoom = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'Bad room id' });

    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    try { verifyToken(token); } catch { return res.status(401).json({ error: 'Invalid token' }); }

    const update = { ...req.body };
    delete update._id;

    const updated = await Room.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Room not found' });
    res.json(updated);
  } catch (err) {
    console.error('updateRoom:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /api/rooms/:id
exports.deleteRoom = async (req, res) => {
  try {
    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });
    try { verifyToken(token); } catch { return res.status(401).json({ error: 'Invalid token' }); }

    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    await User.updateMany({ rooms: room._id }, { $pull: { rooms: room._id } });

    res.status(204).send();
  } catch (err) {
    console.error('deleteRoom:', err);
    res.status(500).json({ error: 'Server error' });
  }
};