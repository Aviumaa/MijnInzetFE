"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 1; i < 200; i++) {
      const seedData = {
        userId: i,
        roleId: faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8]),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    const accounts = [
      {
        userId: 1000001,
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1000002,
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1000003,
        roleId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1000004,
        roleId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1000005,
        roleId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1000006,
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1000007,
        roleId: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 1000008,
        roleId: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (let i = 0; i < accounts.length; i++) {
      newData.push(accounts[i]);
    }

    return queryInterface.bulkInsert("userRoles", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("userRoles", null, {});
  }
};
