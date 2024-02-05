"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      Service.belongsTo(models.Town, { foreignKey: "townId" });
    }
  }

  Service.init(
    {
      serviceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      price: {
        allowNull: false,
        type: DataTypes.FLOAT,
      },
      inclusionType: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      townId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Towns",
          key: "townId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // Adjust this based on your requirements
      },
    },
    {
      sequelize,
      modelName: "Service",
    }
  );

  return Service;
};
