const { User, Role } = require("../sequelize");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie_options = {
  expiresIn: 3600
};

exports.doLogin = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    },
    include: [
      {
        model: Role
      }
    ]
  }).then(user => {
    if (!user) {
      res.status(401).send({ error: "Username or password is incorrect" });
    } else {
        result = bcrypt.compareSync(req.body.password, user.password);
        if (result == true) {
          const token = jwt.sign(
            {
              id: user.id,
              username: user.username,
              role: user.roles[0].userRole.roleId
            },
            "secretkey",
            cookie_options
          );
          res
            .cookie("token", token, { httpOnly: false, secure: false })
            .status(200)
            .json(token);
          } else {
            console.log("result is not true");
          }
    }
  });
};

// exports.doLogin = async (req, res) => {
//     try {
//         const token = await LoginService.doLogin(req.body.password, req.body.username);
//         return res
//             .cookie("token", token, {httpOnly: false, secure: false})
//             .status(200)
//             .json(token);
//     } catch (e) {
//         return res.status(400).json({status: 400, message: e.message});
//     }
// };
