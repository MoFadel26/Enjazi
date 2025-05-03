const express = require("express");
const { signup, login, logout, getMe } = require("../controllers/authControllers");
const { protectRoute } = require('../middleware/protectRoute');

const router = express.Router();
router.post("/me", protectRoute ,getMe);
router.post("/signup", signup);
router.post("/login" , login);
router.post("/logout" , logout);

module.exports = router;