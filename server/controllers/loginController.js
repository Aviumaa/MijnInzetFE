const {
  User
} = require('../sequelize');

var jwt = require('jsonwebtoken');

const {
  UserRole
} = require('../sequelize');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const cookie_options = {
  expiresIn: 3600

}

exports.doLogin = async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  
  var userData;
  var roleData;

  await User.findOne({
    where:{
      username: username,
      password: password
    }
  }).then(userResponse => {
    console.log("userResponse");
    console.log(userResponse);
    userData = userResponse;
    if (userResponse == null){
      res.status(400);
    }
    else{
      
    }
  });

  console.log("userData");
  console.log(userData);

  await UserRole.findOne({
    where:{
      userId: userData.id
    },
    attributes: ["id", "userId", "roleId"]
  }).then(roleResponse => {
    roleData = roleResponse;
  }).catch(error => {
    console.log(error);
  })

  if (userData == null){
    res.status(401).json({message: "Wrong credentials"});
  } else if (roleData == null){
    res.status(401).json({message: "No role info found in database"});
  } else{
    var token = jwt.sign({ id: userData.id, username: userData.username, role: roleData.roleId }, "secretkey", cookie_options);
    res.cookie('token', token, {httpOnly: true, secure: true}).status(200).json(userData);
  }
  
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