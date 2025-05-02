const User = require('../models/user.model');
const mongoose = require('mongoose');
// All task routes are nested under /api/users/:uid/tasks
exports.addTask = async (req, res, next) => {
  try {
    const user = await User.findOne({ userID: req.params.uid });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const newTask = { ...req.body, _id: mongoose.Types.ObjectId() };
    user.tasks.unshift(newTask);
    await user.save();
    res.status(201).json(newTask);
  } catch (err) { next(err); }
};

exports.getTasks = async (req, res, next) => {
  try {
    const user = await User.findOne({ userID: req.params.uid });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user.tasks);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { uid, tid } = req.params;
    const user = await User.findOne({ userID: uid });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const task = user.tasks.id(tid);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    Object.assign(task, req.body);
    await user.save();
    res.json(task);
  } catch (err) { next(err); }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { uid, tid } = req.params;
    const user = await User.findOne({ userID: uid });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.tasks.id(tid).remove();
    await user.save();
    res.status(204).end();
  } catch (err) { next(err); }
};