'use strict';

module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('educationalPrograms', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: type.STRING,
                allowNull: false
            },
            year: {
                type: type.INTEGER,
            },
            study: {
                type: type.STRING,
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
        return queryInterface.dropTable('educationalPrograms');
    }
};
