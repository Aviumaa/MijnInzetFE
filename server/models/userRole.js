module.exports = (sequelize, Sequelize) => {

    const UserRole = sequelize.define("userRole", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        roleId: {
            type: Sequelize.INTEGER
        }
    });

    return UserRole;
}
