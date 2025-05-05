const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const settingsRoutes = require('./routes/settingsRoutes');
const userRoutes = require('./routes/userRoutes');
const tasksRoutes = require('./routes/tasksRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const cors = require("cors");
const passwordRoutes = require('./routes/passwordRoutes');// Z edit
const oauthRoutes = require('./routes/oauthRoutes');
const adminRoutes = require('./routes/adminRoutes');
// const session = require('express-session');
//  server start here
const app = express();

const authRoutes = require("./routes/authRoutes.js")

// Connect MongoDB from config folder:
const connectMongoDB = require("./config/db.js")
const PORT = process.env.PORT || 5001;
// server.js

const cookieParser = require('cookie-parser');

app.use(cookieParser());
// Enable all CORS requests
app.use(
  cors({
    origin: "http://localhost:3000", //frontend's origin
    credentials: true,  //allow cookies / auth headers
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use(express.json()); // to parse req.body
// Authorization (login & signup)
app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);

// Tasks
app.use('/api/tasks', tasksRoutes);

// Events
app.use('/api/events', eventsRoutes);
// Settings
app.use('/api/settings', settingsRoutes);//Z edit

app.use('/api/password', passwordRoutes);// Z edit

const roomRoutes    = require('./routes/roomRoutes');
app.use('/api/rooms', roomRoutes);
app.use('/api/oauth', oauthRoutes);
app.use('/api/admin', adminRoutes);

// Start the server
(async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () =>
      console.log(`API listening on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'your-secret-key',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { 
//     secure: process.env.NODE_ENV === 'production',
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));