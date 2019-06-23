const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const vacancyController = require("../controllers/vacancyController");
const VacancyValidator = require("../validators/vacanciesValidator");

router.get("/",  vacancyController.getVacancies);

router.get("/open",  vacancyController.getVacanciesOpen);

router.get("/closed",  vacancyController.getVacanciesClosed);

router.get("/:vacancyId",  VacancyValidator.validate('getVacancyById'), vacancyController.getVacancyById);

router.post("/", withAuth, VacancyValidator.validate('postVacancy'), vacancyController.postVacancy);

router.post("/:vacancyId/:userId", withAuth, VacancyValidator.validate('addUserToVacancy'), vacancyController.addUserToVacancy);

module.exports = router;
