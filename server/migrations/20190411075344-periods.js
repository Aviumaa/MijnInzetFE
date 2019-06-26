'use strict';

module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('periods', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            schoolYear: {
                type: type.STRING,
                allowNull: false
            },
            quarter: {
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
        return queryInterface.dropTable('periods');
    }
};
