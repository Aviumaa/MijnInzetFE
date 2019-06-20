"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];
    const seederDataPerUser = 10;

    for (let i = 0; i < seederDataPerUser; i++) {
      const seedData = {
        userId: 1000001,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    for (let i = 0; i < seederDataPerUser; i++) {
      const seedData = {
        userId: 1000002,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    for (let i = 0; i < seederDataPerUser; i++) {
      const seedData = {
        userId: 1000003,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    for (let i = 0; i < seederDataPerUser; i++) {
      const seedData = {
        userId: 1000004,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    for (let i = 0; i < seederDataPerUser; i++) {
      const seedData = {
        userId: 1000005,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    for (let i = 0; i < seederDataPerUser; i++) {
      const seedData = {
        userId: 1000006,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    for (let i = 0; i < seederDataPerUser; i++) {
      const seedData = {
        userId: 1000007,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    for (let i = 0; i < seederDataPerUser; i++) {
      const seedData = {
        userId: 1000008,
        vacancyId: Math.floor(Math.random() * 200) + 1,
        status: Math.floor(Math.random() * 3),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("userVacancies", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("userVacancies", null, {});
  }
};
