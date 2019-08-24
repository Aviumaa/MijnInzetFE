module.exports = (sequelize, Sequelize) => {
  const Timeslot = sequelize.define("timeslot", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    start_time: {
      type: Sequelize.STRING(5)
    },
    day_of_week: {
      type: Sequelize.INTEGER
    }
  });

  return Timeslot;
};
