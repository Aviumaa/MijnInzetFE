'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const newData = [];

        const titles = ["Propedeuse",
        "Jaar 2 SE"];
        const years = [1, 2];

        for (let i = 0; i < titles.length; i++) {
            const seedData = {
                title: titles[i],
                year: years[i],
                study: "Software engineering",
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }

        return queryInterface.bulkInsert('educationalPrograms', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('educationalPrograms', null, {});
    }
};
