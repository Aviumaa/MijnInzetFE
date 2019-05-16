'use strict';

const faker = require("faker");

module.exports = {
    up: (queryInterface, Sequelize) => {
        const newData = [];

        for (let i = 0; i < 200; i++) {
            const seedData = {
                task: faker.random.arrayElement(["Lesgeven", "Surveilleren", "Begeleiding", "Nakijken"]),
                title: faker.name.jobTitle(),
                description: faker.lorem.paragraph(),
                contactPerson: faker.name.findName(),
                period: faker.random.arrayElement([
                    "Sem1 | 2018-2019",
                    "Sem1 | 2019-2020",
                    "Sem1 | 2020-2021",
                    "Sem2 | 2018-2019",
                    "Sem2 | 2020-2021",
                    "Sem2 | 2019-2020",
                    "Blok1 | 2018-2019",
                    "Blok1 | 2019-2020",
                    "Blok1 | 2020-2021",
                    "Blok2 | 2020-2021",
                    "Blok2 | 2018-2019",
                    "Blok2 | 2019-2020",
                    "Blok3 | 2020-2021",
                    "Blok3 | 2018-2019",
                    "Blok3 | 2019-2020",
                    "Blok4 | 2020-2021",
                    "Blok4 | 2018-2019",
                    "Blok4 | 2019-2020"
                ]),
                typeCourse: faker.random.arrayElement(["VT", "DT"]),
                contactHours: faker.random.number(30),
                startDate: faker.date.past(),
                endDate: faker.date.future(),
                openSlots: faker.random.number(120),
                createdAt: new Date(),
                updatedAt: new Date()
            };
            newData.push(seedData);
        }

        return queryInterface.bulkInsert('vacancies', newData);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('vacancies', null, {});
    }
};
