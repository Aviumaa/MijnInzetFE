"use strict";

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable("users", {
      id: {
        type: type.STRING,
        primaryKey: true
        // autoIncrement: true
      },
      salutation: {
        type: type.STRING
      },
      fullName: {
        type: type.STRING
      },
      username: {
        type: type.STRING
      },
      password: {
        type: type.STRING
      },
      email: {
        type: type.STRING
      },
      telephone: {
        type: type.STRING
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
    return queryInterface.dropTable("users");
  }
};
