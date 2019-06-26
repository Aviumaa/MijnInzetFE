"use strict";

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable("vacancyPeriods", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      periodId: {
        type: type.INTEGER,
        references: {
          model: "periods",
          key: "id"
        },
        allowNull: false
      },
      vacancyId: {
        type: type.INTEGER,
        references: {
          model: "vacancies",
          key: "id"
        },
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
    return queryInterface.dropTable("vacancyPeriods");
  }
};
