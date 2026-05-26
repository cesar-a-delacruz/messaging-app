const Controller = require("./Controller.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");

module.exports = class UserController extends Controller {
  constructor(repository, validator) {
    super(repository, validator);
    this.uploader = uploadMiddleware.bind(null, "image");
  }

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
