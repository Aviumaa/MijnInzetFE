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
                email: faker.internet.email(),

        const accounts = [
            {id: 1000001, username: "docent", password: "docent", email: "docent@hva.nl", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000002, username: "onderwijsprogrammacoordinator", password: "onderwijsprogrammacoordinator", email: "coordinator@hva.nl", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000003, username: "projectcoordinator", password: "projectcoordinator", email: "projectcoordinator@hva.nl", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000004, username: "modulecoordinator", password: "modulecoordinator", email: "modulecoordinator@hva.nl", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000005, username: "facilitator", password: "facilitator", email: "facilitator@hva.nl", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000006, username: "admin", password: "admin", email: "admin@hva.nl", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000007, username: "roosteraar", password: "roosteraar", email: "roosteraar@hva.nl", createdAt: new Date(), updatedAt: new Date()}
        ];

    for (let i = 0; i < accounts.length; i++) {
      newData.push(accounts[i]);
    }

    return queryInterface.bulkInsert("users", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
