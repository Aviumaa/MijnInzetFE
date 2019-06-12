const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const timeslotsController = require("../controllers/timeslotsController");

router.get("/:userId", withAuth, timeslotsController.getTimeslots);

router.put("/:userId", withAuth, timeslotsController.updateTimeslots);

module.exports = router;
