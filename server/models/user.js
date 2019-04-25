const Joi = require('joi');

module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        roleId:{
            type: type.INTEGER,
            allowNull: false
        }
    })
}

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
