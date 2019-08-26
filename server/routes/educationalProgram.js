const express = require("express");
const router = express.Router();
const checkJwt = require("../middelware/middleware");
const educationalProgramController = require("../controllers/educationalProgramController");

router.get(
  "/schoolRelated",
  checkJwt,
  educationalProgramController.getEducationalPrograms
);

router.get(
  "/nonSchoolRelated",
  checkJwt,
  educationalProgramController.getNonEducationalPrograms
);

router.get(
  "/:educationalProgramId",
  checkJwt,
  educationalProgramController.getEducationalProgramById
);

router.post("/", checkJwt, educationalProgramController.postEducationalProgram);

module.exports = router;
