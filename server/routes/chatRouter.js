const express = require("express");
const router = express.Router();
const ChatController = require("../controllers/chatController");

router.post("/", ChatController.createChat);
router.get("/:userId", ChatController.findUserChats);
router.get("/find/:firstId/:secondId", ChatController.findChat);

module.exports = router;
