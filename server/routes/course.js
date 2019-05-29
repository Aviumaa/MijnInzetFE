const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const {
    Course
} = require("../sequelize");

router.get("/", courseController.getCourses);

router.get("/:courseId", courseController.getCourseById);

router.post("/", courseController.postCourse);

module.exports = router;
