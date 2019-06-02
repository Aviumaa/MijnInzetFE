"use strict";

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable("vacancies", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      task: {
        type: type.STRING,
        allowNull: false
      },
      title: {
        type: type.STRING,
        allowNull: false
      },
      description: {
        type: type.TEXT
      },
      contactPerson: {
        type: type.STRING
      },
      schoolYear: {
        type: type.STRING
      },
      period: {
        type: type.STRING
      },
      typeCourse: {
        type: type.STRING
      },
      contactHours: {
        type: type.INTEGER
      },
      typeTask: {
        type: type.STRING
      },
      startDate: {
        type: type.DATE
      },
      endDate: {
        type: type.DATE
      },
      openSlots: {
        type: type.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: type.DATE
      },
      updatedAt: {
        allowNull: false,
        type: type.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("vacancies");
  }
};
