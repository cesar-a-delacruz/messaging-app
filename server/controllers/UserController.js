const CRUDController = require("./CRUDController.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");
const FileService = require("../services/FileService.js");

module.exports = class UserController extends CRUDController {
  constructor(itemName, repository, validator, fileField) {
    super(itemName, repository, validator);
    this.uploader = uploadMiddleware.bind(null, fileField);
  }

  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll(req.user.id, req.query.q);

      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();

      console.table(rows);
      return res.status(200).json({ data: rows }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
    }
  };
  findAllNotInChat = async (req, res) => {
    try {
      const rows = await this.repository.findAllNotInChat(req.params.chatId);

      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();

      console.table(rows);
      return res.status(200).json({ data: rows }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
    }
  };
  findOne = async (req, res) => {
    try {
      const id = req.params.id !== "profile" ? req.params.id : req.user.id;
      const row = await this.repository.findOne(id);

      if (!row)
        return res
          .status(404)
          .json({ error: `This ${this.itemName} doesn't exists.`, data: row })
          .end();

      console.info(row);
      return res.status(200).json({ data: row }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find ${this.itemName}.` })
        .end();
    }
  };
  create = [
    async (req, res, next) => await this.uploader(req, res, next),
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        let row = await this.repository.create(req.body);

        if (req.file) {
          const fileUpload = await FileService.upload(
            row.id,
            req.file.buffer,
            "user",
          );
          row = await this.repository.update(row.id, {
            image: fileUpload.secure_url,
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
  update = [
    async (req, res, next) => await this.uploader(req, res, next),
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        if (req.file) {
          const fileUpload = await FileService.upload(
            req.params.id,
            req.file.buffer,
            "user",
          );
          req.body.image = fileUpload.secure_url;
        }

        const row = await this.repository.update(req.params.id, req.body);
        console.info(row);
        return res.status(204).end();
      } catch (error) {
        console.error(error);

        if (error.code === "P2025")
          return res
            .status(400)
            .json({ error: `Can't find ${this.itemName} to update.` })
            .end();

        return res
          .status(500)
          .json({ error: `Failed to update ${this.itemName}.` })
          .end();
      }
    },
  ];
  delete = async (req, res) => {
    try {
      const row = await this.repository.delete(req.params.id);
      if (row.image) await FileService.delete(row.image);
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
