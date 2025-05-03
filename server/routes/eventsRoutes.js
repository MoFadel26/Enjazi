const express = require('express');
const eventController = require("../controllers/eventControler");


const router = express.Router();

// POST /api/events
router.post('/', eventController.createEvent);

module.exports = router;
