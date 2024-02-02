const path = require("path");
const { Op } = require("sequelize");
const { Trip } = require("../../../sequelize_config/models");
const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { TripDTO } = require("../../../compiled/trip/serializers/trip_serializer");

const get_trips_service = async () => {
  try {
    return await Trip.findAll();
  } catch (error) {
    throw error;
  }
};

const get_trip_service = async (id) => {
  return await Trip.findByPk(id);
};

const create_trip_service = async (data) => {
  try {
    const trip_serializer = plainToInstance(TripDTO, data);
    const errors = await validate(trip_serializer);

    if (errors.length > 0) {
      throw errors;
    }

    return await Trip.create(trip_serializer);
  } catch (error) {
    console.error("Error in createTrip:", error);
    throw error;
  }
};

const update_trip_service = async (id, updatedData) => {
  const trip = await Trip.findByPk(id);
  await trip.update(updatedData);
  return trip;
};

const delete_trip_service = async (id) => {
  const trip = await Trip.findByPk(id);
  await trip.destroy();
  return trip;
};

const filter_trips_service = async (filters) => {
  const trips = await Trip.findAll({
    where: {
      [Op.or]: [
        { label: { [Op.iLike]: `%${filters}%` } },
        { description: { [Op.iLike]: `%${filters}%` } },
      ],
    },
  });
  return trips;
};


module.exports = {
  get_trips_service,
  get_trip_service,
  create_trip_service,
  update_trip_service,
  delete_trip_service,
  filter_trips_service,

};
