"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    const roles = [
      "Administrateur",
      "Docent",
      "Onderwijsprogrammacoordinator",
      "Projectcoordinator",
      "Modulecoordinator",
      "Facilitator",
      "Roosteraar",
      "Coordinator"
    ];

    for (let i = 0; roles.length > i; i++) {
      const seedData = {
        name: roles[i],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("roles", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("roles", null, {});
  }
};
