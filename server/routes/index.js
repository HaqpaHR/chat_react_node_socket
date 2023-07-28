const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const chatRouter = require("./chatRouter");
const messageRouter = require('./messageRouter')

router.use("/users", userRouter);
router.use("/chats", chatRouter);
router.use('/messages', messageRouter)

module.exports = router;
