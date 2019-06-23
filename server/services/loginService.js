const {User, Role} = require("../sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie_options = {
    expiresIn: 3600
};


exports.doLogin = async (username, password) => {
    const user = User.findOne({
        where: {
            username: username
        },
        include: [
            {
                model: Role
            }
        ]
    })

    if (!user) {
        throw Error('Username or password is incorect')
    } else {
        const result = bcrypt.compareSync(password, user.password);
        if (result == true) {
            const token = await jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    role: user.roles[0].userRole.roleId
                },
                "secretkey",
                cookie_options
            );
            return token;
        } else {
            console.log("result is not true");
        }
    }
}


