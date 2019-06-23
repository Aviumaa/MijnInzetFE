const {param, body} = require('express-validator')

exports.validate = (method) => {
    switch (method) {
        case 'getUserById': {
            return [
                param('userId', 'Id needs to be filled').exists().isNumeric().withMessage('Id needs to be a numeric value')
            ]
        }
        case 'updateUser': {
            return [
                param('userId', 'userId needs to be filled').exists().isNumeric().withMessage('userId needs to be a numeric value'),
                body('roleId', 'roleId needs to be filled').exists().isNumeric().withMessage('roleId needs to be a numeric value'),
                body('salutation').isIn(['dhr.', 'mw.']),
                body('username'),
                body('fullName'),
                body('email', 'Value is not a valid email address').isEmail(),
                body('telephone')
            ]
        }
        case 'updateEmail': {
            return [
                param('userId', 'userId needs to be filled').exists().isNumeric().withMessage('userId needs to be a numeric value'),
                body('email', 'Value is not a valid email address').isEmail()
            ]
        }
        case 'getUserVacancyByUserId': {
            return [
                param('userId', 'Id needs to be filled').exists().isNumeric().withMessage('Id needs to be a numeric value')
            ]
        }
        case 'getUserVacancyByUserIdAndStatus': {
            return [
                param('userId', 'Id needs to be filled').exists().isNumeric().withMessage('Id needs to be a numeric value'),
                param('status', 'Status needs to be filled').exists().isNumeric().withMessage('Status needs to be a numeric value')

            ]
        }
    }
}
