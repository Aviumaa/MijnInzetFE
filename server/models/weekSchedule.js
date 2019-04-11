module.exports = (sequelize, type) => {
    return sequelize.define('week_schedule', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        week_of_year: {
            type: type.INTEGER,
            allowNull: false
        }

    })
}