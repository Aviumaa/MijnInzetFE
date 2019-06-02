"use strict";
module.exports = (sequelize, type) => {
  const Role = sequelize.define("role", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: type.STRING,
      allowNull: false
    }
  });

  Role.associate = models => {
    Role.belongsToMany(models.User, {
      through: "userRole",
      foreignKey: "roleId"
    });
  };

  return Role;
};
