"use strict";

const faker = require("faker");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync();

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    const hashedAccounts = [
      {
        id: 1000001,
        username: "docent",
        password: bcrypt.hashSync("docent", salt),
        email: "docent@hva.nl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000002,
        username: "onderwijsprogrammacoordinator",
        password: bcrypt.hashSync("onderwijsprogrammacoordinator", salt),
        email: "coordinator@hva.nl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000003,
        username: "projectcoordinator",
        password: bcrypt.hashSync("projectcoordinator", salt),
        email: "projectcoordinator@hva.nl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000004,
        username: "modulecoordinator",
        password: bcrypt.hashSync("modulecoordinator", salt),
        email: "modulecoordinator@hva.nl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000005,
        username: "facilitator",
        password: bcrypt.hashSync("facilitator", salt),
        email: "facilitator@hva.nl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000006,
        username: "admin",
        password: bcrypt.hashSync("admin", salt),
        email: "admin@hva.nl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000007,
        username: "roosteraar",
        password: bcrypt.hashSync("roosteraar", salt),
        email: "roosteraar@hva.nl",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000008,
        username: "coordinator",
        password: bcrypt.hashSync("coordinator", salt),
        email: "roosteraar@hva.nl",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // for (let i = 0; i < 200; i++) {
    //   const seedData = {
    //     username: faker.internet.userName(),
    //     password: bcrypt.hashSync(faker.internet.password(), salt),
    //     email: faker.internet.email(),
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   };
    //   newData.push(seedData);
    // }

    for (let i = 0; i < hashedAccounts.length; i++) {
      newData.push(hashedAccounts[i]);
    }

    return queryInterface.bulkInsert("users", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
