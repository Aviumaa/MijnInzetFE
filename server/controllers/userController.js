const { User } = require("../sequelize");
const { UserRole } = require("../sequelize");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.editUser = (req,res) => {
    console.log("edituser");
let userId = req.params.userId;

    User.findOne({
        where:{
            id: userId
        }
    }).then(userResponse => {
      res.status(200).json(userResponse);
    })
  }