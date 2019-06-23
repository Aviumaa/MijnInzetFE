const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const UserValidator = require("../validators/userValidator");

const loginController = require("../controllers/loginController");
const userController = require("../controllers/userController");

router.post("/login", loginController.doLogin);

router.get("/", withAuth, userController.getDecodedUserData);

router.get("/all", withAuth, userController.findAllUsers);

router.get("/:userId", withAuth, userController.getUserById);

router.put("/:userId/update", UserValidator.validate('updateUser'), withAuth, userController.updateUser);

router.put("/:userId/email", UserValidator.validate('updateEmail'), userController.updateEmail);
module.exports = router;
