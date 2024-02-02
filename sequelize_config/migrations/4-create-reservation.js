'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reservations', {
      reservationId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Assuming your User model is named 'User'
          key: 'userId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tripId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Trips', // Replace 'Trips' with your actual Trip model name
          key: 'tripId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      programId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Programs', // Replace 'Programs' with your actual Program model name
          key: 'programId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Reservations');
  }
};
