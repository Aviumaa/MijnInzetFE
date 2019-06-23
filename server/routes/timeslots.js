const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const TimeslotsController = require("../controllers/timeslotsController");
const TimeSlotValidator = require("../validators/timeslotsValidator");

router.get("/:userId", TimeSlotValidator.validate('getTimeslots'), withAuth, TimeslotsController.getTimeslots);

router.put("/:userId", TimeSlotValidator.validate('updateTimeslots'), withAuth, TimeslotsController.updateTimeslots);

module.exports = router;
