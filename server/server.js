const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const express = require("express");



// connecting to the database
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));





//  server start here 
const app = express();

// app.use(express.json({ limit: "10kb" }));
// app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const server = app.listen(process.env.PORT, () => {
  console.log("listening.. port :", process.env.PORT);
});
// handle the REJECTION Error golbly and exit the app
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});