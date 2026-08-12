const FileController = require("./FileController.js");

module.exports = class GroupController extends FileController {
  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll(req.params.page);

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

        const rows = await this.repository.create(group, chatMembers);
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
