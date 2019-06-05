"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];
    //Seed data for the propedeuse
    //First 18 courses are part of this program
    for (let i = 1; i < 18; i++) {
      const seedData = {
        educationalProgramId: 1,
        courseId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }
    //Seed data for second year SE.
    //Courses 18 - 27 are part of this program.
    for (let i = 18; i < 27; i++) {
      const seedData = {
        educationalProgramId: 2,
        courseId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("educationalProgramCourses", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("educationalProgramCourses", null, {});
  }
};
