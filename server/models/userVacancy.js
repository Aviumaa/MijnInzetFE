'use strict';
module.exports = (sequelize, type) => {
    return sequelize.define('userVacancies', {
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
    })
}
