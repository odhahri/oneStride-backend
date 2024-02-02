const reservationService = require("../../../src/reservation/services/reservation_service");
const responseWrapper = require("../../../core/helpers/responseWrapper");
const { ValidationError } = require('class-validator');

const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationService.get_reservations_service();
    return res.json(
      responseWrapper(
        reservations,
        "get_reservations_service",
        "Reservations retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_reservations_service", "Internal Server Error", false)
      );
  }
};

const getReservationById = async (req, res) => {
  const { id } = req.params;

  try {
    const reservation = await reservationService.get_reservation_service(id);
    return res.json(
      responseWrapper(
        reservation,
        "get_reservation_service",
        "Reservation retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_reservation_service", "Internal Server Error", false)
      );
  }
};

const createReservation = async (req, res) => {
  try {
    const reservation_before_send = req.body;
    console.log("reservation_before_send: \n " + reservation_before_send + "\n");
    const reservation = await reservationService.create_reservation_service(req.body);
    return res
      .status(201)
      .json(
        responseWrapper(
          reservation,
          "create_reservation_service",
          "Reservation created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      return res.status(400).json(
        responseWrapper(null, "create_reservation_service", error, false)
      );
    }

    return res.status(500).json(
      responseWrapper(null, "create_reservation_service", "Internal Server Error", false)
    );
  }
};

const updateReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReservation = await reservationService.update_reservation_service(id, req.body);
    if (!updatedReservation) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "update_reservation_service", "Reservation not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedReservation,
        "update_reservation_service",
        "Reservation updated successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "updateReservation", "Internal Server Error", false)
      );
  }
};

const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReservation = await reservationService.delete_reservation_service(id);
    if (!deletedReservation) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "delete_reservation_service", "Reservation not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedReservation,
        "delete_reservation_service",
        "Reservation deleted successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "deleteReservation", "Internal Server Error", false)
      );
  }
};

const getReservationsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await reservationService.get_reservations_by_user_service(userId);

    return res.json(
      responseWrapper(
        reservations,
        "get_reservations_by_user_service",
        "Reservations retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(
          null,
          "get_reservations_by_user_service",
          "Internal Server Error",
          false
        )
      );
  }
};
module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation,
};
