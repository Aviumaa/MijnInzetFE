'use strict';

module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('userVacancies', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            vacancy: {
                type: type.INTEGER,
                allowNull: false
            },
            user: {
                type: type.INTEGER,
                allowNull: false
            },
            escalated: {
                type: type.BOOLEAN,
                defaultValue: false
            },
            rejected: {
                type: type.BOOLEAN,
                defaultValue: false
            },
            message: {
                type: type.TEXT
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
        return queryInterface.dropTable('userVacancies');
    }
};
