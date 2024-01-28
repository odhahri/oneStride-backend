const express = require("express");
const router = express.Router();

// Define trip routes
router.get("/", (req, res) => {
  res.send("Trip Home Page");
});

router.get("/details", (req, res) => {
  res.send("Trip Details Page");
});

// Add more routes as needed

module.exports = router;
