'use strict';

const faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        const newData = [];

        for (let i = 0; i < 200; i++) {
            const seedData = {
                username: faker.name.findName(),
                password: faker.name.findName(),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }

        const accounts = [
            {id: 1000001, username: "docent", password: "docent", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000002, username: "onderwijsprogrammacoordinator", password: "onderwijsprogrammacoordinator", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000003, username: "projectcoordinator", password: "projectcoordinator", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000004, username: "modulecoordinator", password: "modulecoordinator", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000005, username: "facilitator", password: "facilitator", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000006, username: "admin", password: "admin", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000007, username: "roosteraar", password: "roosteraar", createdAt: new Date(), updatedAt: new Date()},
            {id: 1000008, username: "coordinator", password: "coordinator", createdAt: new Date(), updatedAt: new Date()}
        ];

        for (let i = 0; i < accounts.length; i++){
            newData.push(accounts[i]);
        }

        return queryInterface.bulkInsert('users', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
