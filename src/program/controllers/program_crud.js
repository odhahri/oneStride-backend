const path = require("path");
const programService = require("../../../src/program/services/program_service");
const responseWrapper = require("../../../core/helpers/responseWrapper");
const { ValidationError } = require('class-validator');

const getAllPrograms = async (req, res) => {
  try {
    const programs = await programService.get_programs_service();
    return res.json(
      responseWrapper(
        programs,
        "get_programs_service",
        "Programs retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_programs_service", "Internal Server Error", false)
      );
  }
};

const getProgramById = async (req, res) => {
  const { id } = req.params;

  try {
    const program = await programService.get_program_service(id);
    return res.json(
      responseWrapper(
        program,
        "get_program_service",
        "Program retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_program_service", "Internal Server Error", false)
      );
  }
};

const createProgram = async (req, res) => {
  try {
    const program_before_send = req.body;
    console.log("program_before_send: \n " + program_before_send + "\n");
    const program = await programService.create_program_service(req.body);
    return res
      .status(201)
      .json(
        responseWrapper(
          program,
          "create_program_service",
          "Program created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      return res.status(400).json(
        responseWrapper(null, "create_program_service", error, false)
      );
    }

    return res.status(500).json(
      responseWrapper(null, "create_program_service", "Internal Server Error", false)
    );
  }
};

const updateProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProgram = await programService.update_program_service(id, req.body);
    if (!updatedProgram) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "update_program_service", "Program not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedProgram,
        "update_program_service",
        "Program updated successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "updateProgram", "Internal Server Error", false)
      );
  }
};

const deleteProgram = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProgram = await programService.delete_program_service(id);
    if (!deletedProgram) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "delete_program_service", "Program not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedProgram,
        "delete_program_service",
        "Program deleted successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "deleteProgram", "Internal Server Error", false)
      );
  }
};

const getProgramsByTripTowns = async (req, res) => {
  try {
    const { departTownId, destTownId } = req.query;
    console.log("departTownId: "+departTownId+"destTownId"+destTownId)

    if (!departTownId || !destTownId) {
      return res.status(400).json({ error: 'Both departTownId and destTownId are required.' });
    }

    const programs = await programService.get_programs_by_trip_towns_service(departTownId, destTownId);

    return res.json({ programs, message: 'Programs retrieved successfully.', success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const filterPrograms = async (req, res) => {
  try {
    const { filters } = req.query;

    if (!filters) {
      return res.status(400).json({ error: 'Filters are required.' });
    }

    const programs = await programService.filter_programs_service(filters);

    return res.json({
      programs,
      message: 'Programs filtered successfully.',
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};
module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramsByTripTowns,
  filterPrograms
};
