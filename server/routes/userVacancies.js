const express = require("express");
const router = express.Router();
const userVacancyController = require("../controllers/userVacancyController");
const {
    UserVacancy
} = require("../sequelize");

router.get("/", userVacancyController.getUserVacancies);

router.get("/:userVacancyId", userVacancyController.getUserVacancyById);

router.post("/", (req, res) => {
    UserVacancy.create({
        user: req.body.userId,
        vacancy: req.body.vacancyId
    })
        .then(userVacancies => res.json(userVacancies))
        .catch(err => console.error(err));
});

module.exports = router;
