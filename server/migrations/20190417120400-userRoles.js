"use strict";

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable("userRoles", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
