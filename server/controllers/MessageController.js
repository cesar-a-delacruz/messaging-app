const FileController = require("./FileController.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");

module.exports = class MessageController extends FileController {
  findAllByChat = async (req, res) => {
    try {
      const rows = await this.repository.findAllByChat(req.params.chatId);

      if (!rows.length)
        return res
          .status(404)
          .json({ message: "No items heve been found." })
          .end();

      console.table(rows);
      return res.status(200).json({ data: rows }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to find items." }).end();
    }
  };
};
