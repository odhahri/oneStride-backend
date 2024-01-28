// models/service.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.Program, { foreignKey: "programId" });
    }
  }

  Service.init(
    {
      serviceId: {
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
      price: {
        type: DataTypes.FLOAT,
      },
      inclusionType: {
        type: DataTypes.BOOLEAN,
      },
      programId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Service",
    }
  );

  return Service;
};
