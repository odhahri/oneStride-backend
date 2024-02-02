const { Reservation } = require("../../../sequelize_config/models");
const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { ReservationDTO } = require("../../../compiled/reservation/serializers/reservation_serializer");

const get_reservations_service = async () => {
  try {
    return await Reservation.findAll();
  } catch (error) {
    throw error;
  }
};

const get_reservation_service = async (id) => {
  return await Reservation.findByPk(id);
};

const create_reservation_service = async (data) => {
  try {
    const reservation_serializer = plainToInstance(ReservationDTO, data);
    const errors = await validate(reservation_serializer);

    if (errors.length > 0) {
      throw errors;
    }

    return await Reservation.create(reservation_serializer);
  } catch (error) {
    console.error("Error in createReservation:", error);
    throw error;
  }
};

const update_reservation_service = async (id, updatedData) => {
  const reservation = await Reservation.findByPk(id);
  await reservation.update(updatedData);
  return reservation;
};

const delete_reservation_service = async (id) => {
  const reservation = await Reservation.findByPk(id);
  await reservation.destroy();
  return reservation;
};

const get_reservations_by_user_service = async (userId) => {
  try {
    return await Reservation.findAll({
      where: { userId },
    });
  } catch (error) {
    throw error;
  }
};
module.exports = {
  get_reservations_service,
  get_reservation_service,
  create_reservation_service,
  update_reservation_service,
  delete_reservation_service,
  get_reservations_by_user_service
};
