import { signup, login, logout } from '../controllers/authControllers';

const express = require("express");
const router = express.Router();

router.get("/sinup", signup);

router.get("/login", login);

router.get("/login", logout);

export default router;