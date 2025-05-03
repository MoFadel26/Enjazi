const express = require('express');
const { protectRoute } = require('../middleware/protectRoute');
const {
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskControler.js');

const router = express.Router();

// POST /api/tasks
router.post   ('/', protectRoute, createTask); // create task
router.patch  ('/:id', protectRoute, updateTask); // update task
router.delete ('/:id', protectRoute, deleteTask); // delete task

module.exports = router;