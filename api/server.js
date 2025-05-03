// Import all needed libraries:
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require("../server/routes/authRoutes");
const userRoutes = require("../server/routes/userRoutes");
const tasksRoutes = require("../server/routes/tasksRoutes");
const eventsRoutes = require("../server/routes/eventsRoutes");
const settingsRoutes = require("../server/routes/settingsRoutes");
const passwordRoutes = require("../server/routes/passwordRoutes");

// Connect MongoDB
const connectMongoDB = require("../server/config/db");

// Initialize the app
const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? process.env.FRONTEND_URL 
      : "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.get("/api/health", (req, res) => {
  res.status(200).send("API is running");
});

app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/password', passwordRoutes);

// Connect to MongoDB
connectMongoDB().catch(err => console.error("Failed to connect to MongoDB:", err));

// For Vercel serverless deployment
const handler = (req, res) => {
  // Set CORS headers for all requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  return app(req, res);
};

module.exports = handler; 