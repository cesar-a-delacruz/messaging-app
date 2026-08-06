const Controller = require("./Controller.js");

module.exports = class ChatController extends Controller {
  findAllByUser = async (req, res) => {
    try {
      const rows = await this.repository.findAllByUser(req.params.userId);

      if (!rows.length)
        return res
          .status(404)
          .json({ message: "No items heve been found." })
          .end();

      console.table(rows);
      return res.status(200).json({ data: rows }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to find items." }).end();
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
          .json({ message: "This item doesn't exists." })
          .end();

      console.info(row);
      return res.status(200).json({ data: row }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to find item." }).end();
    }
  };
  findOneByGroup = async (req, res) => {
    try {
      const row = await this.repository.findOneByGroup(req.params.groupId);

      if (!row)
        return res
          .status(404)
          .json({ message: "This item doesn't exists." })
          .end();

      console.info(row);
      return res.status(200).json({ data: row }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to find item." }).end();
    }
  };
};
