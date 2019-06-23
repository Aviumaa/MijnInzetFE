const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");
const {validationResult} = require('express-validator');


// GET decoded token from logged in user
exports.getDecodedUserData = (req, res) => {
    // check header for the token
    const token = req.cookies.token;

    // decode token
    if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token, "secretkey", (err, decoded) => {
            if (err) {
                return res.json({message: err});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                return res.status(200).json(decoded);
            }
        });
    } else {
        // if there is no token

        res.send({
            message: "No token provided."
        });
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
        UserService.updateEmail(req.body.email, req.params.userId);
        return res.status(200).json({status: 200, message: "Successfully updated email"});
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
