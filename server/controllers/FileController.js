const Controller = require("./Controller.js");
const uploadMiddleware = require("../middlewares/uploadMiddleware.js");

module.exports = class FileController extends Controller {
  constructor(itemName, repository, validator, fileField) {
    super(itemName, repository, validator);
    this.uploader = uploadMiddleware.bind(null, fileField);
  }

  create = [
    async (req, res, next) => await this.uploader(req, res, next),
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        const row = await this.repository.create(req.body);
        console.info(row);
        return res.status(201).json({ data: row }).end();
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
