// routes/passwordRoutes.js
const express = require('express');
const { protectRoute } = require('../middleware/protectRoute');
const { changePassword } = require('../controllers/passwordController');

const router = express.Router();

// POST /api/password/change - Change user password
router.post('/change', protectRoute, changePassword);

module.exports = router;