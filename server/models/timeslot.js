module.exports = (sequelize, type) => {
    return sequelize.define('timeslot', {
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
        }

    })
}