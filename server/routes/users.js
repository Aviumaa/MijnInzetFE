const _ = require('lodash')
const { User } = require('../sequelize');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginController = require("../controllers/loginController");

router.post('/crypt/', async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // let user = await User.findOne({ email: req.body.email });
    // if (user) return res.status(400).send('User already registered.');

    // user = new User(_.pick(req.body, ['name', 'email', 'role', 'password']));
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
    // await user.save();

    // res.send(_.pick(user, ['_id', 'name', 'email', 'role']));
});


router.get('/', (req, res) => {
    // check header for the token
    var token = req.cookies.token;
    console.log("token is");
    console.log(token);

    // decode token
    if (token) {

      // verifies secret and checks if the token is expired
      jwt.verify(token, "secretkey", (err, decoded) =>{      
        if (err) {
          return res.json({ message: err });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;    
          console.log('token is gucci');
          return res.status(200).json(decoded);
        }
      });

    } else {

      // if there is no token  

      res.send({ 

          message: 'No token provided.' 
      });
    }
})

router.post('/isAdmin', loginController.isUserAdministrator)

router.post('/login', loginController.doLogin);

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        roleId: req.body.roleId
    })
        .then(user => res.json(user)).catch(err => console.error(err))
})
module.exports = router;



