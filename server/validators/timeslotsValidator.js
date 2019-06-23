const {param, body} = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'getTimeslots': {
            return [
                param('userId', 'Id must be a numeric value').exists().isNumeric()
            ]
        }
        case 'updateTimeslots': {
            return [
                param('userId', 'Id must be a numeric value').exists().isNumeric(),
                body('timeslots') //TODO
            ]
        }
    }
}
