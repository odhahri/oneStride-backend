'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripId: {
        type: Sequelize.INTEGER
      },
      destTownId: {
        type: Sequelize.INTEGER
      },
      departTownId: {
        type: Sequelize.INTEGER
      },
      label: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      departureDate: {
        type: Sequelize.DATE
      },
      comingDate: {
        type: Sequelize.DATE
      },
      personPrice: {
        type: Sequelize.FLOAT
      },
      images: {
        type: Sequelize.STRING
      },
      classes: {
        type: Sequelize.STRING
      },
      places: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trips');
  }
};