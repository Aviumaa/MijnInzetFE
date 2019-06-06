const express = require("express");
const router = express.Router();
const withAuth = require("../middelware/middleware");
const roleController = require("../controllers/roleController");

router.get("/", withAuth, roleController.findAllRoles);

module.exports = router;
