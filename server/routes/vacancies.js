const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const vacancyController = require("../controllers/vacancyController");

router.get("/", withAuth, vacancyController.getVacancies);

router.get("/open", withAuth, vacancyController.getVacanciesOpen);

router.get("/closed", withAuth, vacancyController.getVacanciesClosed);

router.get("/:vacancyId", withAuth, vacancyController.getVacancyById);

router.post("/", withAuth, vacancyController.postVacancy);

module.exports = router;
