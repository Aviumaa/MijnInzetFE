"use strict";
module.exports = (sequelize, Sequelize) => {
  const Vacancy = sequelize.define("vacancy", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    typeCourse: {
      type: Sequelize.STRING
    },
    typeTask: {
      type: Sequelize.STRING
    },
    contactHours: {
      type: Sequelize.INTEGER
    },
    contactPerson: {
      type: Sequelize.STRING
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

  Vacancy.associate = models => {
    Vacancy.belongsToMany(models.User, {
      through: models.UserVacancy
    });
  };

  Vacancy.associate = (models) => {
    Vacancy.belongsToMany(models.Periods, {
      through: "vacancyPeriods",
      foreignKey: "vacancyId",
      onDelete: "CASCADE",
      hooks: true
    });
  };

  return Vacancy;
};
