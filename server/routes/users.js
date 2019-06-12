const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");

const loginController = require("../controllers/loginController");
const userController = require("../controllers/userController");

router.post("/login", loginController.doLogin);

router.get("/", withAuth, userController.getDecodedUserData);

router.get("/all", withAuth, userController.findAllUsers);

router.get("/:userId/edit", withAuth, userController.editUser);

router.put("/:userId/edit", withAuth, userController.doEdit);

module.exports = router;
