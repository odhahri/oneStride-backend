"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    static associate(models) {
      Program.belongsToMany(models.Trip, {
        through: "ProgramTrip", // Junction table
        foreignKey: "programId",
      });
      
      Program.hasMany(models.Reservation, { foreignKey: "programId" });
    }
  }

  Program.init(
    {
      programId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      personPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      images: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Program",
    }
  );

  return Program;
};
