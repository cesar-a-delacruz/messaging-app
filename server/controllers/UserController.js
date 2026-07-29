const FileController = require("./FileController.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");

module.exports = class UserController extends FileController {
  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll(req.params.userId);
      console.table(rows);
      return res
        .status(200)
        .json({ message: "Items found successfully.", data: rows })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find items.", error })
        .end();
    }
  };
  findAllNotInChat = async (req, res) => {
    try {
      const rows = await this.repository.findAllNotInChat(req.params.chatId);
      console.table(rows);
      return res
        .status(200)
        .json({ message: "Items found successfully.", data: rows })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find items.", error })
        .end();
    }
  };
};
