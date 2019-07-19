"use strict";
module.exports = (sequelize, type) => {
  const EducationalProgram = sequelize.define("educationalProgram", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: type.STRING,
      allowNull: false
    },
    year: {
      type: type.INTEGER
    },
    study: {
      type: type.STRING
    },
    schoolRelated: {
      type: type.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: type.DATE
    },
    updatedAt: {
      allowNull: false,
      type: type.DATE
    }
  });

  EducationalProgram.associate = models => {
    EducationalProgram.belongsToMany(Course, {
      through: "educationalProgramCourse",
      foreignKey: "educationalProgramId"
    });
    // EducationalProgram.belongsToMany(models.Course, {
    //   through: "educationalprogramcourses",
    //   foreignKey: "educationalProgramId",
    //   onDelete: "CASCADE",
    //   hooks: true
    // });
  };
  
  return EducationalProgram;
};
