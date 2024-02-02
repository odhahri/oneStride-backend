const townService = require("../../../src/town/services/town_service");
const responseWrapper = require("../../../core/helpers/responseWrapper");
const { ValidationError } = require('class-validator');

const getAllTowns = async (req, res) => {
  try {
    const towns = await townService.get_towns_service();
    return res.json(
      responseWrapper(
        towns,
        "get_towns_service",
        "Towns retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_towns_service", "Internal Server Error", false)
      );
  }
};

const getTownById = async (req, res) => {
  const { id } = req.params;

  try {
    const town = await townService.get_town_service(id);
    return res.json(
      responseWrapper(
        town,
        "get_town_service",
        "Town retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_town_service", "Internal Server Error", false)
      );
  }
};

const createTown = async (req, res) => {
  try {
    const town_before_send = req.body;
    console.log("town_before_send: \n " + town_before_send + "\n");
    const town = await townService.create_town_service(req.body);
    return res
      .status(201)
      .json(
        responseWrapper(
          town,
          "create_town_service",
          "Town created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      return res.status(400).json(
        responseWrapper(null, "create_town_service", error, false)
      );
    }

    return res.status(500).json(
      responseWrapper(null, "create_town_service", "Internal Server Error", false)
    );
  }
};

const updateTown = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTown = await townService.update_town_service(id, req.body);
    if (!updatedTown) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "update_town_service", "Town not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedTown,
        "update_town_service",
        "Town updated successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "updateTown", "Internal Server Error", false)
      );
  }
};

const deleteTown = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTown = await townService.delete_town_service(id);
    if (!deletedTown) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "delete_town_service", "Town not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedTown,
        "delete_town_service",
        "Town deleted successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "deleteTown", "Internal Server Error", false)
      );
  }
};

module.exports = {
  getAllTowns,
  getTownById,
  createTown,
  updateTown,
  deleteTown,
};
