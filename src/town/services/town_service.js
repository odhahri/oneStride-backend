const { Town } = require("../../../sequelize_config/models");
const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { TownDTO } = require("../../../compiled/town/serializers/town_serializer");

const get_towns_service = async () => {
  try {
    return await Town.findAll();
  } catch (error) {
    throw error;
  }
};

const get_town_service = async (id) => {
  return await Town.findByPk(id);
};

const create_town_service = async (data) => {
  try {
    const town_serializer = plainToInstance(TownDTO, data);
    const errors = await validate(town_serializer);

    if (errors.length > 0) {
      throw errors;
    }

    return await Town.create(town_serializer);
  } catch (error) {
    console.error("Error in createTown:", error);
    throw error;
  }
};

const update_town_service = async (id, updatedData) => {
  const town = await Town.findByPk(id);
  await town.update(updatedData);
  return town;
};

const delete_town_service = async (id) => {
  const town = await Town.findByPk(id);
  await town.destroy();
  return town;
};

module.exports = {
  get_towns_service,
  get_town_service,
  create_town_service,
  update_town_service,
  delete_town_service,
};
