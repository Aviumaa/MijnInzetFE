"use strict";

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable("userVacancies", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      vacancyId: {
        type: type.INTEGER,
        references: {
          model: "vacancies",
          key: "id"
        },
        allowNull: false
      },
      userId: {
        type: type.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        allowNull: false
      },
      status: {
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
    return queryInterface.dropTable("userVacancies");
  }
};
