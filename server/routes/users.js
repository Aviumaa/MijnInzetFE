const _ = require("lodash");
const { User } = require("../sequelize");
const express = require("express");
const router = express.Router();
const Model = require("../sequelize");

const loginController = require("../controllers/loginController");
const userController = require("../controllers/userController");

router.post("/login", loginController.doLogin);

router.get("/", userController.getDecodedUserData);

router.get("/all", userController.findAllUsers);

router.get("/:userId/edit", userController.editUser);

router.put("/:userId/edit", userController.doEdit);

module.exports = router;
