const Controller = require("./Controller.js");

module.exports = class ChatMemberController extends Controller {
  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll(req.params.groupId);

      if (!rows.length)
        return res
          .status(404)
          .json({ message: "No items heve been found." })
          .end();

      console.table(rows);
      return res
        .status(200)
        .json({ message: "Items found successfully.", data: rows })
        .end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to find items." }).end();
    }
  };
  create = [
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        const rows = await this.repository.create(
          JSON.parse(req.body.chatMembers),
        );
        console.info(rows);
        return res.status(201).json({ data: rows }).end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create items." })
          .end();
      }
    },
  ];
};
