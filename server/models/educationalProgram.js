'use strict';
module.exports = (sequelize, type) => {
    const EducationalProgram = sequelize.define('educationalProgram', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        year: {
            type: type.INTEGER,
        },
        study: {
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

    EducationalProgram.associate = (models) => {
        EducationalProgram.belongsToMany(models.Course, {
            through: "educationalProgramCourse",
            as: "course",
            foreignKey: "course"
        });
    };

    return EducationalProgram;
}
