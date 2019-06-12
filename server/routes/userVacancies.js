const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const userVacancyController = require("../controllers/userVacancyController");

router.get("/", withAuth, userVacancyController.getUserVacancies);

router.get(
  "/:userVacancyId",
  withAuth,
  userVacancyController.getUserVacancyById
);

router.post("/", withAuth, userVacancyController.postUserVacancy);

module.exports = router;
