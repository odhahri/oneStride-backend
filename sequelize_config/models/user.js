"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Reservation, { foreignKey: "userId" });
      User.hasMany(models.Reply, { foreignKey: "userId" });
      User.hasMany(models.Article, { foreignKey: "userId" });
    }
  }

  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fname: {
        type: DataTypes.STRING,
      },
      lname: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      phone: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        lowercase: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          // Ensure that the username is stored in lowercase
          if (user.username) {
            user.username = user.username.toLowerCase();
          }
        },
      },
    }
  );

  return User;
};
