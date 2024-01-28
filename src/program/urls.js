const express = require("express");
const router = express.Router();

// Define program routes
router.get("/", (req, res) => {
  res.send("Program Home Page");
});

router.get("/details", (req, res) => {
  res.send("Program Details Page");
});

// Add more routes as needed

module.exports = router;
