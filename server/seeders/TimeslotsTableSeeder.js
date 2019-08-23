"use strict";

const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const newData = [];

    for (let i = 0; i < 200; i++) {
      const seedData = {
        start_time: faker.random.arrayElement([
          "08:30",
          "09:20",
          "10:10",
          "11:10",
          "12:00",
          "12:50",
          "13:40",
          "14:30",
          "15:20",
          "16:10",
          "17:00",
          "17:50",
          "18:40",
          "19:30",
          "20:20",
          "21:10"
        ]),
        day_of_week: faker.random.number({ min: 1, max: 5 }),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      newData.push(seedData);
    }

    return queryInterface.bulkInsert("timeslots", newData);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("timeslots", null, {});
  }
};
