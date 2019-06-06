const { Role } = require("../sequelize");

// GET all roles
exports.findAllRoles = (req, res) => {
  Role.findAll({ attributes: ["id", "name"] }).then(roles => res.json(roles));
};
