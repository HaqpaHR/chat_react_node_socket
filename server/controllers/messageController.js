const MessageModel = require("../models/MessageModels");

class MessageController {
  async createMessage(req, res) {
    const { chatId, senderId, text } = req.body;
    const message = new MessageModel({
      chatId,
      senderId,
      text,
    });
    try {
      const response = await message.save();
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }

  async getMessages(req, res) {
    const { chatId } = req.params;
    try {
      const response = await MessageModel.find({ chatId });
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

module.exports = new MessageController();
