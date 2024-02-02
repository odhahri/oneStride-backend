"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      Trip.belongsToMany(models.Program, {
        through: "ProgramTrip", 
        foreignKey: "tripId",
      });
      Trip.hasMany(models.Reservation, { foreignKey: "tripId" });
    }
  }

  Trip.init(
    {
      tripId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      destTownId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Town',
          key: 'TownId'
        }},
        departTownId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Town',
            key: 'TownId'
          }
        },
      label: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      departureDate: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      comingDate: {
        type: DataTypes.DATE,
      },
      personPrice: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      images: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );

  return Trip;
};
