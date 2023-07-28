const express = require('express');
const router = express.Router();
const MessageController = require('../controllers/messageController')

router.post('/', MessageController.createMessage);
router.get('/:chatId', MessageController.getMessages)

module.exports = router;
