const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const educationalProgramController = require("../controllers/educationalProgramController");
const EducationalProgramValidator = require("../validators/educationalProgramValidator");

router.get(
    "/schoolRelated",
    withAuth,
    educationalProgramController.getAllEducationalPrograms
);

router.get(
    "/schoolRelated/withCourses",
    withAuth,
    educationalProgramController.getAllEducationalProgramsWithCourses
)

router.get(
    "/nonSchoolRelated",
    withAuth,
    educationalProgramController.getAllNonEducationalPrograms
);

router.get(
    "/nonSchoolRelated/withCourses",
    withAuth,
    educationalProgramController.getAllNonEducationalProgramsWithCourses
);

router.get(
    "/:educationalProgramId",
    EducationalProgramValidator.validate('getEducationalProgramById'),
    withAuth,
    educationalProgramController.getEducationalProgramById
);

router.get(
    "/withCourses/:educationalProgramId",
    EducationalProgramValidator.validate('getEducationalProgramByIdWithCourses'),
    withAuth,
    educationalProgramController.getEducationalProgramByIdWithCourses
);

router.post("/",
    EducationalProgramValidator.validate('postEducationalProgram'),
    withAuth,
    educationalProgramController.postEducationalProgram);

module.exports = router;
