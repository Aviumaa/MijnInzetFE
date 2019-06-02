module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define(
    "userRole",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
        }
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "course",
          key: "id"
        }
      }
    },
    {
      timestamps: false
    }
  );

  return UserRole;
};
