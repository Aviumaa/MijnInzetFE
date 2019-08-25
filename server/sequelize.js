const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const VacancyModel = require("./models/vacancy");
const RoleModel = require("./models/role");
const UserVacancyModel = require("./models/userVacancy");
const WeekScheduleModel = require("./models/weekSchedule");
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

const Role = RoleModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Vacancy = VacancyModel(sequelize, Sequelize);
const UserVacancy = UserVacancyModel(sequelize, Sequelize);
const WeekSchedule = WeekScheduleModel(sequelize, Sequelize);
const Timeslot = TimeslotModel(sequelize, Sequelize);
const Course = CourseModel(sequelize, Sequelize);
const EducationalProgram = EducationalProgramModel(sequelize, Sequelize);
const Periods = PeriodsModel(sequelize, Sequelize);

User.belongsToMany(Role, {
  through: "userroles",
  foreignKey: "userId"
});

Role.belongsToMany(User, {
  through: "userroles",
  foreignKey: "roleId"
});

Course.belongsTo(EducationalProgram, {
  foreignKey: "educationalProgramId"
});

EducationalProgram.hasMany(Course, {
  foreignKey: "educationalProgramId"
});

User.belongsToMany(Vacancy, {
  through: "userVacancies",
  foreignKey: "userId"
});

Vacancy.belongsToMany(User, {
  through: "userVacancies",
  foreignKey: "vacancyId"
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
  User,
  Vacancy,
  UserVacancy,
  Role,
  Timeslot,
  WeekSchedule,
  Course,
  EducationalProgram,
  Periods,
  sequelize
};
