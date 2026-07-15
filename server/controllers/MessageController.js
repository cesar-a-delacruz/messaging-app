const Controller = require("./Controller.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");

module.exports = class MessageController extends Controller {
  constructor(repository, validator) {
    super(repository, validator);
    this.uploader = uploadMiddleware.bind(null, "attachment");
  }
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
  findChat = async (req, res) => {
    try {
      const rows = await this.repository.findChat(
        req.params.senderId,
        req.params.receiverId,
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
  create = [
    async (req, res, next) => await this.uploader(req, res, next),
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        const row = await this.repository.create(req.body);
        console.info(row);
        return res
          .status(201)
          .json({ message: "Item created successfully", data: row })
          .end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create item", error })
          .end();
      }
    },
  ];
};
