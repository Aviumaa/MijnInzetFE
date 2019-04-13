module.exports = (sequelize, type) => {
  const timeslot = sequelize.define(
    "timeslot",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      start_time: {
        type: type.STRING,
        allowNull: false
      },
      end_time: {
        type: type.STRING,
        allowNull: false
      },
      day_of_week: {
        type: type.dayOfWeek,
        allowNull: false
      }
    },
    {}
  );

  timeslot.associate = function(models) {
    timeslot.belongsTo(models.user);
  };

  return timeslot;
};
