const express = require("express");
const router = express.Router();
const checkJwt = require("../middelware/middleware");

// const loginController = require("../controllers/loginController");
// const userController = require("../controllers/userController");

// router.post("/login", loginController.doLogin);

// router.get("/", checkJwt, userController.getDecodedUserData);

// router.get("/all", checkJwt, userController.findAllUsers);

// router.get("/:userId/edit", checkJwt, userController.editUser);

// router.put("/:userId/edit", checkJwt, userController.doEdit);

// router.put("/:userId/email", userController.updateEmail);
// module.exports = router;
