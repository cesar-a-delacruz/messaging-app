const Controller = require("./Controller.js");

module.exports = class ChatMemberController extends Controller {
  create = [
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        req.body = JSON.parse(req.body.chatMembers);
        const rows = await this.repository.create(req.body);
        console.info(rows);
        return res
          .status(201)
          .json({ message: "Items created successfully.", data: rows })
          .end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create items.", error })
          .end();
      }
    },
  ];
};
