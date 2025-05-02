const express = require('express');
const taskController = require("../controllers/taskControler");


const router = express.Router();

// POST /api/tasks
router.post('/', taskController.createTask);

module.exports = router;
