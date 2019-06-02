const { User } = require("../sequelize");
const { UserRole } = require("../sequelize");

const jwt = require("jsonwebtoken");
const cookie_options = {
  expiresIn: 60
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
    if (userData == null) {
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

exports.getUsers = (req,res) => {
  User.findAll().then(userResponse => {
    res.status(200).json(userResponse);
  })
}
