const FileController = require("./FileController.js");

module.exports = class GroupController extends FileController {
  create = [
    async (req, res, next) => await this.uploader(req, res, next),
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        const rows = await this.repository.create(
          group,
          JSON.parse(req.body.chatMembers),
        );
        console.info(rows);
        return res.status(201).json({ data: rows }).end();
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
