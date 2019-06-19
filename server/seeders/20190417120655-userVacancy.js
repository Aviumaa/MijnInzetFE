"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      const seedData = {
        userId: Math.floor(Math.random() * 200) + 1,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3) + 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    const userVacancies = [
      {
        id: 100000,
        userId: 1000001,
        vacancyId: faker.random.number(120),
        status: faker.random.arrayElement([0, 1, 2, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100001,
        userId: 1000005,
        vacancyId: faker.random.number(120),
        status: faker.random.arrayElement([0, 1, 2, 3]),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100002,
        userId: 1000006,
        vacancyId: faker.random.number(120),
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100003,
        userId: 1000006,
        vacancyId: faker.random.number(120),
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100004,
        userId: 1000006,
        vacancyId: faker.random.number(120),
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100005,
        userId: 1000006,
        vacancyId: faker.random.number(120),
        status: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 100006,
        userId: 1000006,
        vacancyId: faker.random.number(120),
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (let i = 0; i < userVacancies.length; i++) {
      newData.push(userVacancies[i]);
    }

    return queryInterface.bulkInsert("userVacancies", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("userVacancies", null, {});
  }
};
