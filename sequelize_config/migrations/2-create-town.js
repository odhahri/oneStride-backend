'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Towns', {
      townId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      townName: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
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
        // Remove the foreign key constraint
        
        // Drop the table
        await queryInterface.dropTable('Services');
    await queryInterface.dropTable('Towns');
  }
};