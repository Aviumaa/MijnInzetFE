'use strict';

module.exports = (sequelize, type) => {

    const UserVacancy = sequelize.define('userVacancies', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        vacancy: {
            type: type.INTEGER,
            references: {
                model: "vacancies", // name of Target model
                key: "id" // key in Target model that we're referencing
            },
            allowNull: false
        },
        user: {
            type: type.INTEGER,
            references: {
                model: "users", // name of Target model
                key: "id" // key in Target model that we're referencing
            },
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

    UserVacancy.associate = models => {
        UserVacancy.belongsTo(models.User);
    };

    UserVacancy.associate = models => {
        UserVacancy.belongsTo(models.Vacancy);
    };

    return UserVacancy
}
