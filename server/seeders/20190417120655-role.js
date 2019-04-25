'use strict';

const faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        const newData = [];

        const roles = ["Administrateur", "Manager", "Docent", "Roosteraar"];

        for (let i = 0; roles.length > i; i++) {
            const seedData = {
                name: roles[i]
            };
            newData.push(seedData);
        }

        return queryInterface.bulkInsert('role', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('role', null, {});
    }
};
