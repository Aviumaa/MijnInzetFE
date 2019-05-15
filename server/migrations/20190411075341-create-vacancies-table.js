"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("vacancies", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      moduleCoordinator: {
        type: Sequelize.STRING
      },
      period: {
        type: Sequelize.STRING
      },
      typeCourse: {
        type: Sequelize.STRING
      },
      contactHours: {
        type: Sequelize.INTEGER
      },
      contactPerson: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      openSlots: {
        type: Sequelize.INTEGER
      },
      task: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("vacancies");
  }
};
