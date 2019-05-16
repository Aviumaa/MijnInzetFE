const express = require("express");
const router = express.Router();
const timeslotsController = require("../controllers/timeslotsController");
const { Timeslot } = require("../sequelize");

// GET all timeslots from the authenticated user
router.get("/", timeslotsController.getTimeslots);

router.put("/:userId", timeslotsController.updateTimeslots);

module.exports = router;
