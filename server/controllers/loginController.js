const {
  User
} = require('../sequelize');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.doLogin = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  console.log("username = " + username);
  console.log("password = " + password);
  console.log(req.body);
  console.log(req.params);
  User.findOne({
    where:{
      username: username,
      password: password
    },
    attributes: ['id', 'username', 'password', 'createdAt', 'updatedAt']
  }).then(userResponse => {
    console.log(req.param);
    console.log(req.body);
    console.log(userResponse);
    if (userResponse == null){
      res.status(400);
    }
    else{
      res.status(200).json(userResponse);
    }
  })
}