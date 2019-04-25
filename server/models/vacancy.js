'use strict';

module.exports = (sequelize, type) => {

    const Vacancy = sequelize.define('vacancy', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task: {
            type: type.STRING,
            allowNull: false
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        description: {
            type: type.TEXT,
        },
        contactPerson: {
            type: type.STRING,
        },
        period: {
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

    Vacancy.associate = models => {
        Vacancy.hasMany(models.UserVacancy, {
            foreignKey: "vacancy"
        });
    };

    return Vacancy
}
