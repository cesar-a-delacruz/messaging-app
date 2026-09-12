const FileController = require("./FileController.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");

module.exports = class MessageController extends FileController {
  findAllByChat = async (req, res) => {
    try {
      const rows = await this.repository.findAllByChat(
        req.params.chatId,
        req.query.q,
      );

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
  create = [
    async (req, res, next) => await this.uploader(req, res, next),
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        const row = await this.repository.create({
          ...req.body,
          authorId: req.user.id,
        });
        console.info(row);
        return res.status(201).json({ data: row }).end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: `Failed to create ${this.itemName}.` })
          .end();
      }
    },
  ];
};
