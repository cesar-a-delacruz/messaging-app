const Controller = require("./Controller.js");

module.exports = class ChatController extends Controller {
  findAllByUser = async (req, res) => {
    try {
      const rows = await this.repository.findAllByUser(req.params.userId);

      if (!rows.length)
        return res
          .status(404)
          .json({ message: "No items heve been found.", data: rows })
          .end();

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
  findOneByUsers = async (req, res) => {
    try {
      const row = await this.repository.findOneByUsers(
        req.params.loggedUserId,
        req.params.otherUserId,
      );

      if (!row)
        return res
          .status(404)
          .json({ message: "This item doesn't exists.", data: row })
          .end();

      console.info(row);
      return res
        .status(200)
        .json({ message: "Item found successfully.", data: row })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find item.", error })
        .end();
    }
  };
  findOneByGroup = async (req, res) => {
    try {
      const row = await this.repository.findOneByGroup(req.params.groupId);

      if (!row)
        return res
          .status(404)
          .json({ message: "This item doesn't exists.", data: row })
          .end();

      console.info(row);
      return res
        .status(200)
        .json({ message: "Item found successfully.", data: row })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find item.", error })
        .end();
    }
  };
};
