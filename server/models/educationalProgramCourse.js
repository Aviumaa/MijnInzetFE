'use strict';
module.exports = (sequelize, type) => {
    const EducationalProgramCourse = sequelize.define('educationalProgramcourse', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        educationalProgram: {
            type: type.INTEGER,
        },
        course: {
            type: type.INTEGER,
        },
        createdAt: {
            allowNull: false,
            type: type.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: type.DATE,
        }
    });

    return EducationalProgramCourse;
}
