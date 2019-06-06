const express = require("express");
const router = express.Router();
const educationalProgramController = require("../controllers/educationalProgramController");
const { EducationalProgram } = require("../sequelize");

router.get(
  "/schoolRelated",
  educationalProgramController.getEducationalPrograms
);

router.get(
  "/nonSchoolRelated",
  educationalProgramController.getNonEducationalPrograms
);

router.get(
  "/:educationalProgramId",
  educationalProgramController.getEducationalProgramById
);

router.post("/", educationalProgramController.postEducationalProgram);

module.exports = router;
