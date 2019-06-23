const {Timeslot} = require("../sequelize");

exports.getTimeSlots = async (id) => {
    try {
        return await Timeslot.findAll({
            where: {
                user_id: id
            }
        })
    } catch
        (e) {
        throw Error('Error while obtaining timeslots');
    }

}

exports.updateTimeslots = async (id, timeslots) => {

    try {
        //Remove all current timeslots
        Timeslot.destroy({
            where: {
                user_id: id
            }
        });
        //Insert every timeslot
        for (var i = 0; i < timeslots.length; i++) {
            //Split timeslots into day and hour
            var splitDate = timeslots[i].split("-");

            Timeslot.create({
                start_time: splitDate[1],
                day_of_week: splitDate[0],
                user_id: id,
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
        return;
    } catch (e) {
        throw Error('Error while updating timeslots');
    }
}
