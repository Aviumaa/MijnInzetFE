const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const educationalProgramController = require("../controllers/educationalProgramController");
const { EducationalProgram } = require("../sequelize");

router.get(
  "/schoolRelated",
  withAuth,

  educationalProgramController.getEducationalPrograms
);

router.get(
  "/nonSchoolRelated",
  withAuth,

  educationalProgramController.getNonEducationalPrograms
);

router.get(
  "/:educationalProgramId",
  withAuth,

  educationalProgramController.getEducationalProgramById
);

router.post("/", withAuth, educationalProgramController.postEducationalProgram);

module.exports = router;