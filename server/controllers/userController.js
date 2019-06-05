const { User } = require("../sequelize");
const { UserRole } = require("../sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.editUser = (req,res) => {
    let userId = req.params.userId;

    User.findOne({
        where:{
            id: userId
        }
    }).then(userResponse => {
      res.status(200).json(userResponse);
    })
  };

exports.doEdit = (req, res) => {

    let userId = req.params.userId;
    let roleId = req.body.roleId;

    User.update({
        username: req.body.username,
    }, {
        where: {
            id: userId
        }
    })

    UserRole
        .findOne({ where: {userId: userId} })
        .then(function(obj) {
            if(obj) { // update
                UserRole.update({
                    roleId: roleId
                }, 
                {
                    where:{
                        userId: userId
                },
                attributes: ["userId", "roleId"]
                })
            }
            else { // insert
                UserRole.create({
                    userId: userId,
                    roleId: roleId
                })
            }
        })
}

exports.updateEmail = (req, res) => {
    console.log(req.body);
    let userId = req.params.userId;
    let email = req.body.email;

    User.update({
        email: email
    },
    {
        where: {
            id: userId
        },
        attributes: ["userId", "email"]
    }).then(response => {
        res.status(200);
    })
}