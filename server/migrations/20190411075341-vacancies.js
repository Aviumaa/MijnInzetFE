"use strict";

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable("vacancies", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: type.STRING
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
      typeTask: {
        type: type.STRING
      },
      contactHours: {
        type: type.INTEGER
      },
      startDate: {
        type: type.DATE
      },
      endDate: {
        type: type.DATE
      },
      openSlots: {
        allowNull: false,
        type: type.INTEGER
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
