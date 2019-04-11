'use strict';

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      const seedData = {
        name: faker.name.jobTitle(),
        description: faker.lorem.paragraph(),
        moduleCoordinator: faker.name.findName(),
        period: faker.lorem.words(),
        typeCourse: faker.random.arrayElement(["VT", "DT"]),
        contactHours: faker.random.number(30),
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        openSlots: faker.random.number(120),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert('vacancies', newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vacancies', null, {});
  }
};