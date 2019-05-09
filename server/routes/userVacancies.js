const express = require("express");
const router = express.Router();
const userVacancyController = require("../controllers/userVacancyController");
const {
    UserVacancy
} = require("../sequelize");

router.get("/", userVacancyController.getUserVacancies);

router.get("/:userVacancyId", userVacancyController.getUserVacancyById);

router.post("/", userVacancyController.postUserVacancy);

module.exports = router;
