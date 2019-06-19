const { User, Role, UserRole } = require("../sequelize");
const jwt = require("jsonwebtoken");

// GET decoded token from logged in user
exports.getDecodedUserData = (req, res) => {
  // check header for the token
  const token = req.cookies.token;

  // decode token
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token, "secretkey", (err, decoded) => {
      if (err) {
        return res.json({ message: err });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        return res.status(200).json(decoded);
      }
    });
  } else {
    // if there is no token

    res.send({
      message: "No token provided."
    });
  }
};

// GET all users
exports.findAllUsers = (req, res) => {
  User.findAll({
    attributes: [
      "id",
      "salutation",
      "username",
      "fullName",
      "email",
      "telephone"
    ],
    include: [
      {
        model: Role
      }
    ]
  }).then(users => {
    res.json(users);
  });
};

// GET the requested user data to edit
exports.editUser = (req, res) => {
  let userId = req.params.userId;

  User.findOne({
    where: {
      id: userId
    }
  }).then(userResponse => {
    res.status(200).json(userResponse);
  });
};

// UPDATE the requested user data
exports.doEdit = (req, res) => {
  let userId = req.params.userId;
  let roleId = req.body.roleId;

  User.update(
    {
      username: req.body.username,
      email: req.body.email
    },
    {
      where: {
        id: userId
      }
    }
  );

  UserRole.findOne({ where: { userId: userId } })
    .then(function(obj) {
      if (obj) {
        // update
        UserRole.update(
          {
            roleId: roleId
          },
          {
            where: {
              userId: userId
            },
            attributes: ["userId", "roleId"]
          }
        );
      } else {
        // insert
        UserRole.create({
          userId: userId,
          roleId: roleId
        });
      }
      res.status(200).send(console.log("updated"));
    })
    .catch(err => {
      res.status(400).send(console.error(err));
    });
};

exports.updateEmail = (req, res) => {
  let userId = req.params.userId;
  let email = req.body.email;

  User.update(
    {
      email: email
    },
    {
      where: {
        id: userId
      },
      attributes: ["userId", "email"]
    }
  ).then(response => {
    res.status(200).send(console.log("email updated"));
  });
};
