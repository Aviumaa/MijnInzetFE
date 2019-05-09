'use strict';

const faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        const newData = [];

        const accounts = [
            {userId: 1000001, roleId: 2},
            {userId: 1000002, roleId: 3},
            {userId: 1000003, roleId: 4},
            {userId: 1000004, roleId: 5},
            {userId: 1000005, roleId: 6},
            {userId: 1000006, roleId: 1},
            {userId: 1000007, roleId: 7}
        ];

        for (let i = 0; i < accounts.length; i++){
            newData.push(accounts[i]);
        }

        return queryInterface.bulkInsert('userRoles', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('userRoles', null, {});
    }
};
