const jwt      = require('jsonwebtoken');
const mongoose = require('mongoose');
const User     = require('../models/userSchema');
const Task     = require('../models/taskSchema');

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

//POST/api/tasks --> For adding
exports.createTask = async (req, res) => {
  try {
    const token   = getToken(req);
    if (!token)      return res.status(401).json({ error: 'Not authenticated' });

    let payload;
    try { payload = verifyToken(token); }
    catch { return res.status(401).json({ error: 'Invalid token' }); }

    const userId = payload.userId;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).json({ error: 'Bad user ID in token' });

    const taskData = {
      title      : req.body.title,
      description: req.body.description,
      priority   : req.body.priority,
      category   : req.body.category,
      dueDate    : req.body.dueDate,
      startTime  : req.body.startTime,
      endTime    : req.body.endTime,
      completed  : req.body.completed || false
    };

    const newTask = await Task.create(taskData);

    await User.findByIdAndUpdate(
      userId,
      { $push: { tasks: newTask._id } }
    );

    res.status(201).json(newTask);
  } catch (err) {
    console.error('createTask: ', err);
    res.status(500).json({ error: 'Server error' });
  }
};


//PATCH /api/tasks/:id  --> For update
exports.updateTask = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'Bad task id' });

    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    try { verifyToken(token); }
    catch { return res.status(401).json({ error: 'Invalid token' }); }

    const body = { ...req.body };
    delete body._id; // disallow id overwrite

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (err) {
    console.error('updateTask: ', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE /api/tasks/:id --> for deleting
exports.deleteTask = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id))
      return res.status(400).json({ error: 'Bad task id' });

    const token = getToken(req);
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    try { verifyToken(token); }
    catch { return res.status(401).json({ error: 'Invalid token' }); }

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await User.updateMany(
      { tasks: task._id },
      { $pull: { tasks: task._id } }
    );

    res.status(204).send();
  } catch (err) {
    console.error('deleteTask: ', err);
    res.status(500).json({ error: 'Server error' });
  }
};
