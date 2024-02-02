const express = require("express");
const path = require("path");
const router = express.Router();
const townController = require(path.join(__dirname, "controllers/town_crud"));

router.get("/get-all-towns", townController.getAllTowns);
router.get("/get-town-by-id/:id", townController.getTownById);
router.post("/create-town", townController.createTown);
router.put("/update-town-by-id/:id", townController.updateTown);
router.delete("/delete-town-by-id/:id", townController.deleteTown);

module.exports = router;
