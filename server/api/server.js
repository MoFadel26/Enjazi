// Import all needed libraries:
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// Import routes
const authRoutes = require("../routes/authRoutes");
const userRoutes = require("../routes/userRoutes");
const tasksRoutes = require("../routes/tasksRoutes");
const eventsRoutes = require("../routes/eventsRoutes");
const settingsRoutes = require("../routes/settingsRoutes");
const passwordRoutes = require("../routes/passwordRoutes");

// Connect MongoDB
const connectMongoDB = require("../config/db");
const mongoose = require("mongoose");

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

// Database connection health check
app.get("/api/db-health", async (req, res) => {
  try {
    // Check MongoDB connection state
    const dbState = mongoose.connection.readyState;
    const dbStateMap = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
      4: "invalid"
    };
    
    // Basic data retrieval test
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);
    
    res.status(200).json({
      status: "success",
      database: {
        connection: dbStateMap[dbState],
        connected: dbState === 1,
        collections: collectionNames,
        timestamp: new Date()
      }
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message
    });
  }
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