'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trips', {
      tripId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      destTownId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Towns',
          key: 'townId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      departTownId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Towns',
          key: 'townId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      label: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      departureDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      comingDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      personPrice: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      images: {
        type: Sequelize.STRING
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
