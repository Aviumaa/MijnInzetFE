"use strict";

module.exports = {
  up: (queryInterface, type) => {
    return queryInterface.createTable("educationalProgramCourses", {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      educationalProgramId: {
        type: type.INTEGER,
        references: {
          model: "educationalPrograms", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        allowNull: false
      },
      courseId: {
        type: type.INTEGER,
        references: {
          model: "courses", // name of Target model
          key: "id" // key in Target model that we're referencing
        },
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: type.DATE
      },
      updatedAt: {
        allowNull: false,
        type: type.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("educationalProgramCourses");
  }
};
