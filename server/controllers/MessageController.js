const FileController = require("./FileController.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");

module.exports = class MessageController extends FileController {
  findAllByChat = async (req, res) => {
    try {
      const rows = await this.repository.findAllByChat(req.params.chatId);

      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();

      console.table(rows);

      const response = {
        currentAuthorId: req.user.id,
        chatId: req.params.chatId,
        messages: rows,
      };
      return res
        .status(200)
        .json({
          data: response,
        })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
    }
  };
};
