const User = require("../models/userSchema.js");
const bcrypt  = require('bcryptjs');
const generateTokenAndSetCookie = require("../lib/utils/generateToken.js");

/*  regexes that mirror the checks in your React sign‑up form  */
const EMAIL_REGEX   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASS_REGEXES  = {
  lower  : /[a-z]/,
  upper  : /[A-Z]/,
  digit  : /\d/,
  special: /[!@#$%^&*(),.?":{}|<>]/
};

// Sing up
async function signup (req, res) {
  try {
    const { username, email, password } = req.body;

    if (!EMAIL_REGEX.test(email))
      return res.status(400).json({ error: 'Invalid email format' });

    // Checking valid password
    const validPw =
      password.length >= 8            &&
      PASS_REGEXES.lower.test(password)   &&
      PASS_REGEXES.upper.test(password)   &&
      PASS_REGEXES.digit.test(password)   &&
      PASS_REGEXES.special.test(password);

    if (!validPw)
      return res.status(400).json({
        error:
          'Password must be ≥ 8 chars and include lower / upper case, number and special character'
      });

    const [userTaken, emailTaken] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email })
    ]);

    if (userTaken)
      return res.status(400).json({ error: 'Username is already taken' });
    if (emailTaken)
      return res.status(400).json({ error: 'Email is already taken' });

    const hashed = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username,
      email,
      password: hashed
    });

    if (createdUser) {
      generateTokenAndSetCookie(createdUser._id, res);
      await createdUser.save(); // Send it to Database
      res.status(201).json({
        data: createdUser
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function login(_req, res)  { res.json({ msg: "login"  }); }
function logout(_req, res) { res.json({ msg: "logout" }); }

module.exports = { signup, login, logout };