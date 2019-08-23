const express = require("express");
const router = express.Router();
const checkJwt = require("../middelware/middleware");
const userVacancyController = require("../controllers/userVacancyController");

router.get("/", checkJwt, userVacancyController.getUserVacancies);

router.get(
  "/:userVacancyId",
  checkJwt,
  userVacancyController.getUserVacancyById
);

router.post("/", checkJwt, userVacancyController.postUserVacancy);

router.get(
  "/user/:status",
  checkJwt,
  userVacancyController.getUserVacancyByStatus
);

router.get(
  "/user/:userId",
  checkJwt,
  userVacancyController.getUserVacancyByUserId
);

module.exports = router;
