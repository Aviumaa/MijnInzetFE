module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    salutation: {
      type: Sequelize.STRING
    },
    fullName: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
    }
  });

  User.associate = models => {
    User.belongsToMany(models.Vacancy, {
      through: models.userVacancy
    });

    User.hasMany(models.Timeslot, {
      foreignKey: "user_id"
    });

    User.belongsToMany(models.Role, {
      through: "userRole",
      foreignKey: "userId"
    });
  };

  return User;
};
