const { Role } = require("../sequelize");

exports.findAllRoles = async () => {

    try {
        return await Role.findAll({ attributes: ["id", "name"]})
    } catch (e) {
        throw Error('Error while finding all roles')
    }
}
