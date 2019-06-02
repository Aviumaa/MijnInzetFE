'use strict';

module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('users', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: type.STRING
            },
            password: {
                type: type.STRING
            },
            email: {
                type: type.STRING
            },
            createdAt: {
                allowNull: false,
                type: type.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: type.DATE,
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};
