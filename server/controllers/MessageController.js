const Controller = require("./Controller.js");

module.exports = class MessageController extends Controller {
  findLatest = async (req, res) => {
    try {
      const row = await this.repository.findLatest(req.params.userId);
      console.info(row);
      return res
        .status(200)
        .json({ message: "Item found successfully", data: row })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find item", error })
        .end();
    }
  };
};
