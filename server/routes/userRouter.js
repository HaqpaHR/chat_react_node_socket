const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/find/:userId", userController.findUser);
router.get("/", userController.getUsers);

module.exports = router;
