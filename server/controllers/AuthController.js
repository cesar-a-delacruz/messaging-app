const Controller = require("./Controller.js");

module.exports = class AuthController extends Controller {
  updateCredentials = [
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        const row = await this.repository.updateCredentials(
          req.params.id,
          req.body,
        );
        console.info(row);
        return res.status(204).end();
      } catch (error) {
        console.error(error);

        if (error.code === "P2025")
          return res
            .status(400)
            .json({
              error: `Can't find ${this.itemName} to update credentials.`,
            })
            .end();
        if (error.code === "P2002")
          return res
            .status(400)
            .json({
              error: `This username already exists.`,
            })
            .end();

        return res
          .status(500)
          .json({ error: `Failed to update ${this.itemName} credentials.` })
          .end();
      }
    },
  ];
};
