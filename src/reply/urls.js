const express = require("express");
const router = express.Router();

// Define reply routes
router.get("/", (req, res) => {
  res.send("Reply Home Page");
});

router.get("/details", (req, res) => {
  res.send("Reply Details Page");
});

// Add more routes as needed

module.exports = router;
