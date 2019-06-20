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
        salutation: faker.random.arrayElement(["dhr.", "mw."]),
        username: "docent",
        fullName: "docent docent",
        password: bcrypt.hashSync("docent", salt),
        email: "docent@hva.nl",
        telephone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000002,
        salutation: faker.random.arrayElement(["dhr.", "mw."]),
        username: "onderwijsprogrammacoordinator",
        fullName: "onderwijsprogrammacoordinator onderwijsprogrammacoordinator",
        password: bcrypt.hashSync("onderwijsprogrammacoordinator", salt),
        email: "onderwijsprogrammacoordinator@hva.nl",
        telephone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000003,
        salutation: faker.random.arrayElement(["dhr.", "mw."]),
        username: "projectcoordinator",
        fullName: "projectcoordinator projectcoordinator",
        password: bcrypt.hashSync("projectcoordinator", salt),
        email: "projectcoordinator@hva.nl",
        telephone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000004,
        salutation: faker.random.arrayElement(["dhr.", "mw."]),
        username: "modulecoordinator",
        fullName: "modulecoordinator modulecoordinator",
        password: bcrypt.hashSync("modulecoordinator", salt),
        email: "modulecoordinator@hva.nl",
        telephone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000005,
        salutation: faker.random.arrayElement(["dhr.", "mw."]),
        username: "facilitator",
        fullName: "facilitator facilitator",
        password: bcrypt.hashSync("facilitator", salt),
        email: "facilitator@hva.nl",
        telephone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000006,
        salutation: faker.random.arrayElement(["dhr.", "mw."]),
        username: "admin",
        fullName: "admin admin",
        password: bcrypt.hashSync("admin", salt),
        email: "admin@hva.nl",
        telephone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000007,
        salutation: faker.random.arrayElement(["dhr.", "mw."]),
        username: "roosteraar",
        fullName: "roosteraar roosteraar",
        password: bcrypt.hashSync("roosteraar", salt),
        email: "roosteraar@hva.nl",
        telephone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1000008,
        salutation: faker.random.arrayElement(["dhr.", "mw."]),
        username: "coordinator",
        fullName: "coordinator coordinator",
        password: bcrypt.hashSync("coordinator", salt),
        email: "coordinator@hva.nl",
        telephone: faker.phone.phoneNumber(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    for (let i = 0; i < hashedAccounts.length; i++) {
      newData.push(hashedAccounts[i]);
    }

    return queryInterface.bulkInsert("users", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
