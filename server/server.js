// Import all needed libraries:
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const tasksRoutes = require('./routes/tasksRoutes');
const eventsRoutes = require('./routes/eventsRoutes');

const cors = require("cors");
//  server start here
const app = express();
// Enable all CORS requests
app.use(cors());

const authRoutes = require("./routes/authRoutes.js")

// Connect MongoDB from config folder:
const connectMongoDB = require("./config/db.js")
const PORT = process.env.PORT || 5000;
// server.js

const cookieParser = require('cookie-parser');

app.use(cookieParser());


app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use(express.json()); // to parse req.body
// Authorization (login & signup)
app.use("/api/auth", authRoutes);

// Tasks
app.use('/api/tasks', tasksRoutes);

// Events
app.use('/api/events', eventsRoutes);

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