'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const newData = [];
        //Seed data for the propedeuse
        for (let i = 1; i < 18; i++) {
            const seedData = {
                educationalProgram: 1,
                course: i,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }
        //Seed data for second year SE.
        for (let i = 18; i < 27; i++) {
            const seedData = {
                educationalProgram: 2,
                course: i,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }

        return queryInterface.bulkInsert('educationalProgramsCourses', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('educationalProgramCourses', null, {});
    }
};
