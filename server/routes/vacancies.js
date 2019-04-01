const express = require("express");
const router = express.Router();
const vacancyController = require("../controllers/vacancyController");
const {
  Vacancy
} = require("../sequelize");

router.get("/", vacancyController.getVacancies);

router.post("/", (req, res) => {
  Vacancy.create({
      name: req.body.name,
      openSlots: req.body.openSlots
    })
    .then(vacancies => res.json(vacancies))
    .catch(err => console.error(err));
});

module.exports = router;