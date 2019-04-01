const express = require('express');
const router = express.Router();
const { Role } = require('../sequelize');

router.get('/', (req, res) => {
    Role.findAll().then(roles => res.json(roles))
})


router.post('/', (req, res) => {
    Role.create({
        name: req.body.name
    })
        .then(user => res.json(user)).catch(err => console.error(err))
})

module.exports = router;
