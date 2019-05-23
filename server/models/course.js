'use strict';
module.exports = (sequelize, type) => {
    const Course = sequelize.define('course', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        ects: {
            type: type.INTEGER,
        },
        period: {
            type: type.STRING,
        },
        type: {
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

    Course.associate = (models) => {
        Course.belongsToMany(models.EducationalProgram, {
            through: "educationalProgramCourse",
            as: "educationalPrograms",
            foreignKey: "educationalProgram"
        });
    };

    return Course;
}
