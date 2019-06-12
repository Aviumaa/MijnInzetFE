const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const {
    Course
} = require("../sequelize");

router.get("/", courseController.getCourses);

router.get("/:courseId", courseController.getCourseById);

router.post("/", courseController.postCourse);

// post in plaats van delete want axios.delete werkte bij mij niet
router.post("/deleteAll", courseController.destroyCoursesByProgramId);

module.exports = router;
