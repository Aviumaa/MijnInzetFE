'use strict';
module.exports = (sequelize, type) => {
    const Periods = sequelize.define('periods', {
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
            allowNull: false
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

    Periods.associate = (models) => {
        Periods.belongsToMany(models.Vacancy, {
            through: "vacancyPeriods",
            foreignKey: "periodId",
            onDelete: "CASCADE",
            hooks: true
        });
    };

    return Periods;
}
