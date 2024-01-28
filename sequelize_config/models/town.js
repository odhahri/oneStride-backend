// models/town.js

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Town extends Model {
    static associate(models) {}
  }

  Town.init(
    {
      townId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      townName: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.BLOB),
      },
      description: {
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
