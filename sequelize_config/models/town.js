// models/town.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Town extends Model {
    static associate(models) {
      Town.hasMany(models.Service, { foreignKey: "townId" });
    }
  }

  Town.init(
    {
      townId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      townName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      images: {
        allowNull: true,
        type: DataTypes.ARRAY(DataTypes.BLOB),
      },
      description: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Town",
    }
  );

  return Town;
};
