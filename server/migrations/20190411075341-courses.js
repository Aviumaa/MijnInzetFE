'use strict';

module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('courses', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: type.STRING,
                allowNull: false
            },
            ects: {
                type: type.INTEGER,
            },
            period: {
                type: type.STRING,
            },
            type: {
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
        return queryInterface.dropTable('courses');
    }
};
