const { Service } = require("../../../sequelize_config/models");
const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { ServiceDTO } = require("../../../compiled/service/serializers/service_serializer");

const get_services_service = async () => {
  try {
    return await Service.findAll();
  } catch (error) {
    throw error;
  }
};

const get_service_service = async (id) => {
  return await Service.findByPk(id);
};

const create_service_service = async (data) => {
  try {
    const service_serializer = plainToInstance(ServiceDTO, data);
    const errors = await validate(service_serializer);

    if (errors.length > 0) {
      throw errors;
    }

    return await Service.create(service_serializer);
  } catch (error) {
    console.error("Error in createService:", error);
    throw error;
  }
};

const update_service_service = async (id, updatedData) => {
  const service = await Service.findByPk(id);
  await service.update(updatedData);
  return service;
};

const delete_service_service = async (id) => {
  const service = await Service.findByPk(id);
  await service.destroy();
  return service;
};

module.exports = {
  get_services_service,
  get_service_service,
  create_service_service,
  update_service_service,
  delete_service_service,
};
