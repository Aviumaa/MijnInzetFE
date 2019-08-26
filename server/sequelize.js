const Sequelize = require("sequelize");
const VacancyModel = require("./models/vacancy");
const UserVacancyModel = require("./models/userVacancy");
const TimeslotModel = require("./models/timeslot");
const CourseModel = require("./models/course");
const EducationalProgramModel = require("./models/educationalProgram");
const PeriodsModel = require("./models/periods");

const sequelize = new Sequelize("MijnInzet-local", "root", "hoihoihoi", {
  host: "127.0.0.1",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Vacancy = VacancyModel(sequelize, Sequelize);
const UserVacancy = UserVacancyModel(sequelize, Sequelize);
const Timeslot = TimeslotModel(sequelize, Sequelize);
const Course = CourseModel(sequelize, Sequelize);
const EducationalProgram = EducationalProgramModel(sequelize, Sequelize);
const Periods = PeriodsModel(sequelize, Sequelize);

Course.belongsTo(EducationalProgram, {
  foreignKey: "educationalProgramId"
});

EducationalProgram.hasMany(Course, {
  foreignKey: "educationalProgramId"
});

Vacancy.belongsToMany(Periods, {
  through: "vacancyPeriods",
  foreignKey: "vacancyId"
});

Periods.belongsToMany(Vacancy, {
  through: "vacancyPeriods",
  foreignKey: "periodId"
});

UserVacancy.hasOne(Vacancy, {
  foreignKey: "id"
});

Vacancy.hasMany(UserVacancy, {
  foreignKey: "vacancyId"
});

module.exports = {
  Vacancy,
  UserVacancy,
  Timeslot,
  Course,
  EducationalProgram,
  Periods,
  sequelize
};
