const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const {validationResult} = require('express-validator');


// GET decoded token from logged in user
exports.getDecodedUserData = async (req, res) => {

    // decode token
    try {
        const decoded = await UserService.getDecodedUserData(req.cookies.token);
        return res.status(200).json(decoded);
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// GET all users
exports.findAllUsers = async (req, res) => {
    try {
        const users = await UserService.findAllUsers();
        return res.status(200).json({status: 200, data: users});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }

};

// GET the requested user data to edit
exports.getUserById = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const user = await UserService.getUserById(req.params.userId);
        return res.status(200).json({status: 200, data: user});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

// UPDATE the requested user data
exports.updateUser = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        await UserService.updateUser(
            req.body.salutation,
            req.body.username,
            req.body.fullName,
            req.body.email,
            req.body.telephone,
            req.params.userId,
            req.body.roleId
        )
        return res.status(200).json({status: 200, message: "Successfully updated user"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }

};

exports.updateEmail = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        await UserService.updateEmail(req.body.email, req.params.userId);
        return res.status(200).json({status: 200, message: "Successfully updated email"});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
};

exports.getUserVacancyByUserId = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const userVacancy = await UserService.getUserVacancyByUserId(req.params.userId);
        return res.status(200).json({status: 200, data: userVacancy});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }

}

exports.getUserVacancyByUserIdAndStatus = async (req, res) => {
    if (validationCheck(req, res)) {
        return;
    }

    try {
        const userVacancy = await UserService.getUserVacancyByUserIdAndStatus(req.params.userId, req.params.status);
        return res.status(200).json({status: 200, data: userVacancy});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }

}

validationCheck = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
}
