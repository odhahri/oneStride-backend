"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      Trip.belongsToMany(models.Program, {
        through: "ProgramTrip", // Junction table
        foreignKey: "tripId",
      });
      Trip.belongsTo(models.Town, {
        foreignKey: "departTownId",
        as: "departureTown",
      });
      Trip.belongsTo(models.Town, {
        foreignKey: "destTownId",
        as: "destinationTown",
      });
      Trip.hasMany(models.Reservation, { foreignKey: "tripId" });
    }
  }

  Trip.init(
    {
      tripId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      departTownId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      destTownId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          // Custom validation to ensure destination town is different from departure town
          notEqualDepartureTown(value) {
            if (parseInt(value, 10) === parseInt(this.departTownId, 10)) {
              throw new Error(
                "Destination town must be different from departure town"
              );
            }
          },
        },
      },
      label: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      departureDate: {
        type: DataTypes.DATE,
      },
      comingDate: {
        type: DataTypes.DATE,
      },
      personPrice: {
        type: DataTypes.FLOAT,
      },
      images: {
        type: DataTypes.STRING,
      },
      classes: {
        type: DataTypes.STRING,
      },
      places: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Trip",
    }
  );

  return Trip;
};
