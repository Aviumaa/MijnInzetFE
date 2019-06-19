"use strict";

module.exports = (sequelize, types) => {
  const UserVacancy = sequelize.define("userVacancies", {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    vacancyId: {
      type: types.INTEGER,
      references: {
        model: "vacancies",
        key: "id"
      },
      allowNull: false
    },
    userId: {
      type: types.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      allowNull: false
    },
    status: {
      type: types.ENUM(0, 1, 2)
    }
  });

  return UserVacancy;
};
