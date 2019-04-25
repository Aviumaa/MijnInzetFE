const {
  User
} = require('../sequelize');

const {
  UserRole
} = require('../sequelize');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.doLogin = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({
    where:{
      username: username,
      password: password
    },
    attributes: ['id', 'username', 'password', 'createdAt', 'updatedAt']
  }).then(userResponse => {
    if (userResponse == null){
      res.status(400);
    }
    else{
      res.status(200).json(userResponse);
    }
  });
};

exports.isUserAdministrator = (req,res) => {
  var userId = req.body.userId;
  var user = UserRole.findOne({
    where:{
      userId: userId,
      roleId: 1
    },
    attributes: ["id", "userId", "roleId"]
  }).then(userResponse => {
    res.status(200).json(userResponse)
  })
}