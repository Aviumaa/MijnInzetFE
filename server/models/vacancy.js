'use strict';
module.exports = (sequelize, type) => {
    return sequelize.define('vacancy', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
        },
        moduleCoordinator: {
            type: type.STRING,
        },
        Period: {
            type: type.STRING,
        },
        typeCourse: {
            type: type.STRING,
        },
        contactHours: {
            type: type.INTEGER,
        },
        startDate: {
            type: type.DATE,
        },
        endDate: {
            type: type.DATE,
        },
        openSlots: {
            type: type.INTEGER,
            allowNull: false
        },
    })
}