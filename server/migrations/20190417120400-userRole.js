'use strict';

module.exports = {
    up: (queryInterface, type) => {
        return queryInterface.createTable('userRole', {
            id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId:{
                type: type.INTEGER,
                references: {
                    model: "users",
                    key: "id"
                },
                allowNull: false
            },
            roleId:{
                type: type.INTEGER,
                references: {
                    model: "role",
                    key: "id"
                },
                allowNull: false
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('userRole');
    }
};
