const _ = require("lodash");
const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");

const loginController = require("../controllers/loginController");
const userController = require("../controllers/userController");

router.post("/login", loginController.doLogin);

router.get("/", userController.getDecodedUserData);

router.get("/all", withAuth, userController.findAllUsers);

router.get("/:userId/edit", userController.editUser);

router.put("/:userId/edit", userController.doEdit);

module.exports = router;
