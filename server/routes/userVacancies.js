const express = require("express");
const router = express.Router();
const checkJwt = require("../middelware/middleware");
const userVacancyController = require("../controllers/userVacancyController");

router.post("/", checkJwt, userVacancyController.postUserVacancy);

router.get(
  "/user/:status",
  checkJwt,
  userVacancyController.getUserVacancyByStatus
);

router.get("/user", checkJwt, userVacancyController.getVacanciesOfUser);

module.exports = router;
