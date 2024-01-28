"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      Program.belongsToMany(models.Trip, {
        through: "ProgramTrip", // Junction table
        foreignKey: "programId",
      });
      Program.hasMany(models.Service, { foreignKey: "programId" });
      Program.hasMany(models.Reservation, { foreignKey: "programId" });
    }
  }

  Program.init(
    {
      programId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      personPrice: {
        type: DataTypes.FLOAT,
      },
      images: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Program",
    }
  );

  return Program;
};
