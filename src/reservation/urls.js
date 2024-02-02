const express = require("express");
const path = require("path");
const router = express.Router();
const reservationController = require(path.join(__dirname, "controllers/reservation_crud"));

router.get("/get-all-reservations", reservationController.getAllReservations);
router.get("/get-reservation-by-userId/:userId", reservationController.getAllReservations);
router.get("/get-reservation-by-id/:id", reservationController.getReservationById);
router.post("/create-reservation", reservationController.createReservation);
router.put("/update-reservation-by-id/:id", reservationController.updateReservation);
router.delete("/delete-reservation-by-id/:id", reservationController.deleteReservation);

module.exports = router;
