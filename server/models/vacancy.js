"use strict";
module.exports = (sequelize, Sequelize) => {
  const Vacancy = sequelize.define("vacancy", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    moduleCoordinator: {
      type: Sequelize.STRING
    },
    period: {
      type: Sequelize.STRING
    },
    typeCourse: {
      type: Sequelize.STRING
    },
    contactHours: {
      type: Sequelize.INTEGER
    },
    startDate: {
      type: Sequelize.DATE
    },
    endDate: {
      type: Sequelize.DATE
    },
    openSlots: {
      type: Sequelize.INTEGER
    }
  });

  return Vacancy;
};
