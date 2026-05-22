const Controller = require("./Controller.js");
const { upload } = require("../configs/fileConfig.js");

module.exports = class UserController extends Controller {
  create = [
    async (req, res, next) => {
      upload.single("image")(req, res, (error) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Failed to create item", error })
            .end();
        }
        next();
      });
    },
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
