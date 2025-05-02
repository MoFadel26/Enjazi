// Import all needed libraries:
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
//  server start here
const app = express();
// Enable all CORS requests
app.use(cors());

// Connect MongoDB from config folder:
const connectMongoDB = require("./config/db.js")
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

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


