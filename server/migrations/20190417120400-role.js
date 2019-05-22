'use strict';

module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('role', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type: type.STRING
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('role');
    }
};
