const express = require("express");
const path = require("path");
const router = express.Router();
const serviceController = require(path.join(__dirname, "controllers/service_crud"));

router.get("/get-all-services", serviceController.getAllServices);
router.get("/get-service-by-id/:id", serviceController.getServiceById);
router.post("/create-service", serviceController.createService);
router.put("/update-service-by-id/:id", serviceController.updateService);
router.delete("/delete-service-by-id/:id", serviceController.deleteService);

module.exports = router;
