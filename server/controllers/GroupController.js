const CRUDController = require("./CRUDController.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");
const FileService = require("../services/FileService.js");

module.exports = class GroupController extends CRUDController {
  constructor(itemName, repository, validator, fileField) {
    super(itemName, repository, validator);
    this.uploader = uploadMiddleware.bind(null, fileField);
  }

  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll(req.query.q);

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
  create = [
    async (req, res, next) => await this.uploader(req, res, next),
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        let { chatMembers, ...group } = req.body;
        chatMembers = JSON.parse(chatMembers);
        chatMembers.push({
          userId: req.user.id,
          role: "ADMIN",
        });
        let row = await this.repository.create(group, chatMembers);

        if (req.file) {
          const fileUpload = await FileService.upload(
            row.id,
            req.file.buffer,
            "group",
          );
          row = await this.repository.update(row.id, {
            image: fileUpload.secure_url,
          });
        }

        console.info(row);
        return res.status(201).json({ data: updatedRow }).end();
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
