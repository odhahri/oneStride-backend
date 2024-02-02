const express = require("express");
const path = require("path");
const router = express.Router();
const programController = require(path.join(__dirname, "controllers/program_crud"));

// Get all programs
router.get("/get-all-programs", programController.getAllPrograms);

// Get program by ID
router.get("/get-program-by-id/:id", programController.getProgramById);

// Create a new program
router.post("/create-program", programController.createProgram);

// Update a program by ID
router.put("/update-program-by-id/:id", programController.updateProgram);

// Delete a program by ID
router.delete("/delete-program-by-id/:id", programController.deleteProgram);

// Get programs by trip towns
router.get("/get-programs-by-trip-towns", programController.getProgramsByTripTowns);

// Filter programs
router.get("/filter-programs", programController.filterPrograms);

module.exports = router;
