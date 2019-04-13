const Sequelize = require("sequelize");
const UserModel = require("./models/user");
const VacancyModel = require("./models/vacancy");
const RoleModel = require("./models/role");
const UserVacancyModel = require("./models/userVacancy");
const WeekScheduleModel = require("./models/weekSchedule");
const TimeslotModel = require("./models/timeslot");

const sequelize = new Sequelize("zzhengk001", "zhengk001", "uyHR9$Wk8eJ5.L", {
  host: "oege.ie.hva.nl",
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });

const Role = RoleModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Vacancy = VacancyModel(sequelize, Sequelize);
const UserVacancy = UserVacancyModel(sequelize, Sequelize);
const WeekSchedule = WeekScheduleModel(sequelize, Sequelize);
const Timeslot = TimeslotModel(sequelize, Sequelize);
User.belongsToMany(Vacancy, {
  through: UserVacancy
});
Vacancy.belongsToMany(User, {
  through: UserVacancy
});
Role.hasMany(User);
// WeekSchedule.hasMany(Timeslot);
User.hasMany(WeekSchedule);

// sequelize.sync({
//         force: true
//     })
//     .then(() => {
//         console.log(`Database & tables created!`)
//     })

module.exports = {
  User,
  Vacancy,
  Role,
  Timeslot,
  WeekSchedule
};
