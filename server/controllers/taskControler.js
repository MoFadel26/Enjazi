// server/controllers/taskController.js

const jwt      = require('jsonwebtoken');
const User     = require('../models/userSchema');
const Task     = require('../models/TaskSchema');
const mongoose = require('mongoose');

/**
 * POST /api/tasks
 * Creates a new Task for the current user (from their JWT).
 */
exports.createTask = async function createTask(req, res) {
  try {
    // 1) Grab the token (from cookie or Authorization header)
    const token =
      // if you set it as an HTTP‐only cookie named "jwt":
      req.cookies?.jwt
      // or, if you’re sending it as a Bearer token:
      || (req.get('Authorization') || '').replace(/^Bearer\s+/i, '');

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // 2) Verify & decode
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

    // 3) Create the Task
    //    Make sure you validate req.body!  Here we just pass it straight through:
    const taskData = {
      title:       req.body.title,
      description: req.body.description,
      priority:    req.body.priority,
      category:    req.body.category,
      dueDate:     req.body.dueDate,
      startTime:   req.body.startTime,
      endTime:     req.body.endTime,
      completed:   req.body.completed      || false,
    };

    const newTask = await Task.create(taskData);

    // 4) Push the Task._id onto the User.tasks array
    await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newTask._id } },
      { new: true }      // return the updated user (optional)
    );

    // 5) Return the created task
    return res.status(201).json(newTask);

  } catch(err) {
    console.error('Error in createTask:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};
