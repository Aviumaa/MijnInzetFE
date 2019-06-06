const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const VacancyModel = require("./models/vacancy");
const RoleModel = require("./models/role");
const UserVacancyModel = require("./models/userVacancy");
const WeekScheduleModel = require("./models/weekSchedule");
const TimeslotModel = require("./models/timeslot");
const UserRoleModel = require("./models/userRole");
const CourseModel = require("./models/course");
const EducationalProgramModel = require("./models/educationalProgram");
const EducationalProgramCourseModel = require("./models/educationalProgramCourse");

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
const EducationalProgramCourse = EducationalProgramCourseModel(
  sequelize,
  Sequelize
);
const UserRole = UserRoleModel(sequelize, Sequelize);

User.belongsToMany(Role, {
  through: "userRole",
  foreignKey: "userId"
});

Role.belongsToMany(User, {
  through: "userRole",
  foreignKey: "roleId"
});

Course.belongsToMany(EducationalProgram, {
  through: "educationalProgramCourse",
  foreignKey: "courseId"
});

EducationalProgram.belongsToMany(Course, {
  through: "educationalProgramCourse",
  foreignKey: "educationalProgramId"
});

module.exports = {
  User,
  Vacancy,
  UserVacancy,
  Role,
  Timeslot,
  WeekSchedule,
  UserRole,
  Course,
  EducationalProgram,
  EducationalProgramCourse,
  sequelize
};
