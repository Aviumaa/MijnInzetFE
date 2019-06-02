const express = require("express");
const router = express.Router();
const educationalProgramController = require("../controllers/educationalProgramController");
const {
    EducationalProgram
} = require("../sequelize");

router.get("/", educationalProgramController.getEducationalPrograms);

router.get("/:educationalProgramId", educationalProgramController.getEducationalProgramById);

router.post("/", educationalProgramController.postEducationalProgram);

module.exports = router;
