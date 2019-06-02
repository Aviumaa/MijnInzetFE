"use strict";
module.exports = (sequelize, Sequelize) => {
    const Vacancy = sequelize.define("vacancy", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        task: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.TEXT
        },
        schoolYear: {
            type: Sequelize.STRING
        },
        period: {
            type: Sequelize.STRING
        },
        typeCourse: {
            type: Sequelize.STRING
        },
        contactHours: {
            type: Sequelize.INTEGER
        },
        contactPerson: {
            type: Sequelize.STRING,
        },
        startDate: {
            type: Sequelize.DATE
        },
        endDate: {
            type: Sequelize.DATE
        },
        openSlots: {
            type: Sequelize.INTEGER
        }
    });

    Vacancy.associate = models => {
        Vacancy.hasMany(models.UserVacancy, {
            foreignKey: "vacancy"
        });
    };

    return Vacancy;

}
