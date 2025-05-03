const express = require('express');
const { protectRoute } = require('../middleware/protectRoute');
const {
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventControler.js');

const router = express.Router();

// POST /api/events
router.post   ('/', protectRoute, createEvent); // create event
router.patch  ('/:id', protectRoute, updateEvent); // update event
router.delete ('/:id', protectRoute, deleteEvent); // delete event

module.exports = router;