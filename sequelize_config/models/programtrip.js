// models/programTrip.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProgramTrip extends Model {}

  ProgramTrip.init(
    {
      programTripId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      programId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tripId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProgramTrip",
    }
  );

  return ProgramTrip;
};
