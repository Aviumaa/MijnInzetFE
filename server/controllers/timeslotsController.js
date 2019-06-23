const TimeslotService = require("../services/timeslotsService");
const {validationResult} = require('express-validator');

// GET all timeslots from the authenticated user
exports.getTimeslots = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const timeslot = await TimeslotService.getTimeSlots(req.params.userId);
        return res.status(200).json({status: 200, data: timeslot});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

//Updates all timeslots for specific user
exports.updateTimeslots = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        await TimeslotService.updateTimeslots(req.params.userId, req.body.timeslots);
        return res.status(200).json({status: 200, message: "Updated timeslots for user with id: " + req.params.userId});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

validationCheck = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
}
