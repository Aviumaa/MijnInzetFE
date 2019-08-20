const express = require("express");
const router = express.Router();
const checkJwt = require("../middelware/middleware");
const timeslotsController = require("../controllers/timeslotsController");

router.get("/:userId", checkJwt, timeslotsController.getTimeslots);

router.put("/:userId", checkJwt, timeslotsController.updateTimeslots);

module.exports = router;
