"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      const seedData = {
        vacancyId: faker.random.number({min: 1, max: 200}),
        periodId: faker.random.number({min: 1, max: 200}),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("vacancyPeriods", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("vacancyPeriods", null, {});
  }
};
