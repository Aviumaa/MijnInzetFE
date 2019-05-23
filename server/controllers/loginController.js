const { User } = require("../sequelize");

var jwt = require("jsonwebtoken");

const { UserRole } = require("../sequelize");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const cookie_options = {
  expiresIn: 3600
};

exports.doLogin = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  var userData;
  var roleData;

  await User.findOne({
    where: {
      username: username,
      password: password
    }
  }).then(userResponse => {
    userData = userResponse;
    if (userResponse == null) {
      res.status(400);
    } else {
    }
  });

  await UserRole.findOne({
    where: {
      userId: userData.id
    },
    attributes: ["id", "userId", "roleId"]
  })
    .then(roleResponse => {
      roleData = roleResponse;
    })
    .catch(error => {
      console.log(error);
    });

  if (userData == null) {
    res.status(401).json({ message: "Wrong credentials" });
  } else if (roleData == null) {
    res.status(401).json({ message: "No role info found in database" });
  } else {
    var token = jwt.sign(
      { id: userData.id, username: userData.username, role: roleData.roleId },
      "secretkey",
      cookie_options
    );
    res
      .cookie("token", token, { httpOnly: false, secure: false })
      .status(200)
      .json(token);
  }
};
