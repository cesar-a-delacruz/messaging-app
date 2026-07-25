const Controller = require("./Controller.js");

module.exports = class ChatController extends Controller {
  findAllByUser = async (req, res) => {
    try {
      const rows = await this.repository.findAllByUser(req.params.userId);
      console.info(rows);
      return res
        .status(200)
        .json({ message: "Items found successfully", data: rows })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find items", error })
        .end();
    }
  };
  findOneByUsers = async (req, res) => {
    try {
      const rows = await this.repository.findOneByUsers(
        req.params.loggedUserId,
        req.params.otherUserId,
      );
      console.info(rows);
      return res
        .status(200)
        .json({ message: "Items found successfully", data: rows })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find items", error })
        .end();
    }
  };
  findOneByUserAndGroup = async (req, res) => {
    try {
      const rows = await this.repository.findOneByUserAndGroup(
        req.params.userId,
        req.params.groupId,
      );
      console.info(rows);
      return res
        .status(200)
        .json({ message: "Items found successfully", data: rows })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find items", error })
        .end();
    }
  };
};
