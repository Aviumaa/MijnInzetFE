const express = require('express');
const router = express.Router();
const { Vacancy } = require('../sequelize');

router.get('/', (req, res) => {
    Vacancy.findAll().then(vacancies => res.json(vacancies))
})

router.post('/', (req, res) => {
    Vacancy.create({
        name: req.body.name,
        openSlots: req.body.openSlots
    })
        .then(vacancies => res.json(vacancies)).catch(err => console.error(err));
})

module.exports = router;
