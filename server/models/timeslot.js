module.exports = (sequelize, Sequelize) => {
  const Timeslot = sequelize.define("timeslot", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    start_time: {
      type: Sequelize.STRING(5)
    },
    // end_time: {
    //   type: Sequelize.STRING(5)
    // },
    day_of_week: {
      type: Sequelize.INTEGER
    }
  });

  Timeslot.associate = models => {
    Timeslot.belongsTo(models.User);
  };

  return Timeslot;
};
