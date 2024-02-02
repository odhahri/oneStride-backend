const serviceService = require("../../../src/service/services/service_service");
const responseWrapper = require("../../../core/helpers/responseWrapper");
const { ValidationError } = require('class-validator');

const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.get_services_service();
    return res.json(
      responseWrapper(
        services,
        "get_services_service",
        "Services retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_services_service", "Internal Server Error", false)
      );
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await serviceService.get_service_service(id);
    return res.json(
      responseWrapper(
        service,
        "get_service_service",
        "Service retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_service_service", "Internal Server Error", false)
      );
  }
};

const createService = async (req, res) => {
  try {
    const service_before_send = req.body;
    console.log("service_before_send: \n " + service_before_send + "\n");
    const service = await serviceService.create_service_service(req.body);
    return res
      .status(201)
      .json(
        responseWrapper(
          service,
          "create_service_service",
          "Service created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      return res.status(400).json(
        responseWrapper(null, "create_service_service", error, false)
      );
    }

    return res.status(500).json(
      responseWrapper(null, "create_service_service", "Internal Server Error", false)
    );
  }
};

const updateService = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedService = await serviceService.update_service_service(id, req.body);
    if (!updatedService) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "update_service_service", "Service not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedService,
        "update_service_service",
        "Service updated successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "updateService", "Internal Server Error", false)
      );
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedService = await serviceService.delete_service_service(id);
    if (!deletedService) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "delete_service_service", "Service not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedService,
        "delete_service_service",
        "Service deleted successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "deleteService", "Internal Server Error", false)
      );
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
