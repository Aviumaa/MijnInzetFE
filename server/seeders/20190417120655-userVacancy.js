'use strict';

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      const seedData = {
        vacancy: faker.random.number(),
        user: faker.random.number(),
        message: faker.lorem.words(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert('userVacancies', newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userVacancies', null, {});
  }
};
