const express = require("express");
const router = express.Router();
const vacancyController = require("../controllers/vacancyController");
const checkJwt = require("../middelware/middleware");

router.get("/", checkJwt, vacancyController.getVacancies);

router.get("/open", checkJwt, vacancyController.getVacanciesOpen);

router.get("/closed", checkJwt, vacancyController.getVacanciesClosed);

router.get("/:vacancyId", checkJwt, vacancyController.getVacancyById);

router.post("/", checkJwt, vacancyController.postVacancy);

module.exports = router;
