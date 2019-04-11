'use strict';

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable('vacancies', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: type.STRING,
        allowNull: false
      },
      description: {
        type: type.TEXT,
      },
      moduleCoordinator: {
        type: type.STRING,
      },
      period: {
        type: type.STRING,
      },
      typeCourse: {
        type: type.STRING,
      },
      contactHours: {
        type: type.INTEGER,
      },
      startDate: {
        type: type.DATE,
      },
      endDate: {
        type: type.DATE,
      },
      openSlots: {
        type: type.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: type.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: type.DATE,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vacancies');
  }
};