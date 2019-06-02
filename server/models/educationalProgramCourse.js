'use strict';
module.exports = (sequelize, type) => {
    const EducationalProgramCourse = sequelize.define('educationalProgramCourse', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        educationalProgram: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'educationalProgram',
                key: 'id'
            },
        course: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'course',
                key: 'id'
            }}
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
