const express = require("express");
const router = express.Router();

// Define article routes
router.get("/", (req, res) => {
  res.send("Article Home Page");
});

router.get("/details", (req, res) => {
  res.send("Article Details Page");
});

// Add more routes as needed

module.exports = router;
