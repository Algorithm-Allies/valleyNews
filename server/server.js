const express = require("express");
const db = require("./config/database");
const cookie = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 8000;

const app = express();

// Middleware
app.use(cors());
app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to database");
  }
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
