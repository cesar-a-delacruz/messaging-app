const CRUDController = require("./CRUDController.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");
const FileService = require("../services/FileService.js");

module.exports = class MessageController extends CRUDController {
  constructor(itemName, repository, validator, fileField) {
    super(itemName, repository, validator);
    this.uploader = uploadMiddleware.bind(null, fileField);
  }

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
        let row = await this.repository.create({
          ...req.body,
          authorId: req.user.id,
        });
        if (req.file) {
          const fileUpload = await FileService.upload(
            row.id,
            req.file.buffer,
            "message",
          );
          row = await this.repository.update(row.id, {
            attachment: fileUpload.secure_url,
          });
        }

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
  delete = async (req, res) => {
    try {
      const row = await this.repository.delete(req.params.id);
      if (row.attachment) await FileService.delete(row.attachment);
      console.info(row);
      return res.status(204).end();
    } catch (error) {
      console.error(error);

      if (error.code === "P2025")
        return res
          .status(400)
          .json({ error: `Can't find ${this.itemName} to delete.` })
          .end();

      return res
        .status(500)
        .json({ error: `Failed to delete ${this.itemName}.` })
        .end();
    }
  };
};
