const express = require("express");
const router = express.Router();

// Define reservation routes
router.get("/", (req, res) => {
  res.send("Reservation Home Page");
});

router.get("/details", (req, res) => {
  res.send("Reservation Details Page");
});

// Add more routes as needed

module.exports = router;
