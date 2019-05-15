"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      const seedData = {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("users", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
