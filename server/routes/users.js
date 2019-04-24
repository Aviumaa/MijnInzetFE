const _ = require('lodash')
const { User } = require('../sequelize');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

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
    User.findAll({
        attributes: ['id', 'username', 'password', 'createdAt', 'updatedAt']
    }).then(users => res.json(users))
})

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



