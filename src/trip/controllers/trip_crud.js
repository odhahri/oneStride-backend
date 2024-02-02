const path = require("path");
const tripService = require("../../../src/trip/services/trip_service");
const responseWrapper = require("../../../core/helpers/responseWrapper");
const { ValidationError } = require('class-validator');

const getAllTrips = async (req, res) => {
  try {
    const trips = await tripService.get_trips_service();
    return res.json(
      responseWrapper(
        trips,
        "get_trips_service",
        "Trips retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_trips_service", "Internal Server Error", false)
      );
  }
};

const getTripById = async (req, res) => {
  const { id } = req.params;

  try {
    const trip = await tripService.get_trip_service(id);
    return res.json(
      responseWrapper(
        trip,
        "get_trip_service",
        "Trip retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_trip_service", "Internal Server Error", false)
      );
  }
};

const createTrip = async (req, res) => {
  try {
    const trip_before_send = req.body;
    console.log("trip_before_send: \n " + trip_before_send + "\n");
    const trip = await tripService.create_trip_service(req.body);
    return res
      .status(201)
      .json(
        responseWrapper(
          trip,
          "create_trip_service",
          "Trip created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      return res.status(400).json(
        responseWrapper(null, "create_trip_service", error, false)
      );
    }

    return res.status(500).json(
      responseWrapper(null, "create_trip_service", "Internal Server Error", false)
    );
  }
};

const updateTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTrip = await tripService.update_trip_service(id, req.body);
    if (!updatedTrip) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "update_trip_service", "Trip not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedTrip,
        "update_trip_service",
        "Trip updated successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "updateTrip", "Internal Server Error", false)
      );
  }
};

const deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTrip = await tripService.delete_trip_service(id);
    if (!deletedTrip) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "delete_trip_service", "Trip not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedTrip,
        "delete_trip_service",
        "Trip deleted successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "deleteTrip", "Internal Server Error", false)
      );
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip,
};
