"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      const seedData = {
        title: faker.name.jobTitle(),
        description: faker.lorem.paragraph(),
        contactPerson: faker.name.findName(),
        schoolYear: faker.random.arrayElement([
          "2018-2019",
          "2019-2020",
          "2020-2021"
        ]),
        period: faker.random.arrayElement([
          "Sem 1",
          "Sem 2",
          "Blok 1",
          "Blok 2",
          "Blok 3",
          "Blok 4"
        ]),
        typeCourse: faker.random.arrayElement(["VT", "DT"]),
        contactHours: faker.random.number(30),
        typeTask: faker.random.arrayElement([
          "Onderwijs",
          "Neventaken onderwijs",
          "Persoonlijke taken",
          "Stages",
          "Afstudeerstages",
          "werkgroepen/commissies"
        ]),
        startDate: faker.date.past(),
        endDate: faker.date.future(),
        openSlots: faker.random.number(120),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("vacancies", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("vacancies", null, {});
  }
};
