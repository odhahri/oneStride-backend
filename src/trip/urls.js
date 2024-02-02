const express = require("express");
const path = require("path");
const router = express.Router();
const tripController = require(path.join(__dirname, "controllers/trip_crud"));

// Get all trips
router.get("/get-all-trips", tripController.getAllTrips);

// Get trip by ID
router.get("/get-trip-by-id/:id", tripController.getTripById);

// Create a new trip
router.post("/create-trip", tripController.createTrip);

// Update a trip by ID
router.put("/update-trip-by-id/:id", tripController.updateTrip);

// Delete a trip by ID
router.delete("/delete-trip-by-id/:id", tripController.deleteTrip);


module.exports = router;
