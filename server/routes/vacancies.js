const express = require("express");
const router = express.Router();
const vacancyController = require("../controllers/vacancyController");
const {
  Vacancy
} = require("../sequelize");

router.get("/", vacancyController.getVacancies);

router.get("/open", vacancyController.getVacanciesOpen);

router.get("/closed", vacancyController.getVacanciesClosed);

router.get("/:vacancyId", vacancyController.getVacancyById);

router.post("/", vacancyController.postVacancy);

module.exports = router;
