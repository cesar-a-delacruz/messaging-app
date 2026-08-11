const CRUDController = require("./CRUDController.js");

module.exports = class ChatMemberController extends CRUDController {
  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll(req.params.groupId);

      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();

      console.table(rows);

      const response = { members: rows };
      for (const member of rows) {
        if (member.userId === req.user.id) {
          response.currentMember = member;
          break;
        }
      }
      return res.status(200).json({ data: response }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
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
          .json({ error: `Failed to create ${this.itemName}.` })
          .end();
      }
    },
  ];
};
