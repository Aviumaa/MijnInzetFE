const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const educationalProgramController = require("../controllers/educationalProgramController");

router.get("/", withAuth, educationalProgramController.getEducationalPrograms);

router.get(
  "/:educationalProgramId",
  withAuth,
  educationalProgramController.getEducationalProgramById
);

router.post("/", withAuth, educationalProgramController.postEducationalProgram);

module.exports = router;
