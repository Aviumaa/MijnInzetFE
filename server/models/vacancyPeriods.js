"use strict";

module.exports = (sequelize, types) => {
  const VacancyPeriods = sequelize.define("vacancyPeriods", {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vacancyId: {
      type: types.INTEGER,
      references: {
        model: "vacancy",
        key: "id"
      },
      allowNull: false
    },
    periodId: {
      type: types.INTEGER,
      references: {
        model: "periods",
        key: "id"
      },
      allowNull: false
    }
  });

  return VacancyPeriods;
};
