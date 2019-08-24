"use strict";

module.exports = (sequelize, types) => {
  const UserVacancy = sequelize.define("userVacancies", {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: types.STRING
    },
    status: {
      type: types.ENUM(0, 1, 2)
    }
  });

  return UserVacancy;
};
