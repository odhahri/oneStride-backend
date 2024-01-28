"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      Reservation.belongsTo(models.User, { foreignKey: "userId" });
      Reservation.belongsTo(models.Program, { foreignKey: "programId" });
      Reservation.belongsTo(models.Trip, { foreignKey: "tripId" });
    }
  }

  Reservation.init(
    {
      reservationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      programId: {
        type: DataTypes.INTEGER,
      },
      tripId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Reservation",
    }
  );

  return Reservation;
};
