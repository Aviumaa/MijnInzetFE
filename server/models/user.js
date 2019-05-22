module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  User.associate = models => {
    User.hasMany(models.UserVacancy, {
      foreignKey: "user"
    });

    User.hasMany(models.Timeslot, {
      foreignKey: "user_id"
    });
  };

    User.associate = models => {
        User.belongsToMany(models.Role, {
            through: "UserRole",
            as: "user",
            foreignKey: "userId"
        });
    };

    return User;
}
