"use strict";

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable("userRoles", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: type.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        allowNull: false
      },
      roleId: {
        type: type.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
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
    return queryInterface.dropTable("userRoles");
  }
};
