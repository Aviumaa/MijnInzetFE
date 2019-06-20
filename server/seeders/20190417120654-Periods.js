"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      const seedData = {
        schoolYear: faker.random.arrayElement([
          "2018-2019",
          "2019-2020",
          "2020-2021"
        ]),
        quarter: faker.random.arrayElement([
          "Blok 1",
          "Blok 2",
          "Blok 3",
          "Blok 4"
        ]),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("periods", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("periods", null, {});
  }
};
