const Controller = require("./Controller.js");
const AuthService = require("../services/AuthService.js");

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
  login = async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await this.repository.findOneByUsername(username);
      if (user === null)
        return res
          .status(400)
          .json({
            error: `Can't find this ${this.itemName}.`,
          })
          .end();

      const token = await AuthService.authenticate(password, user);
      if (!token)
        return res
          .status(400)
          .json({
            error: "Wrong password.",
          })
          .end();

      req.session.token = token;
      return res.status(200).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to authenticate ${this.itemName}.` })
        .end();
    }
  };
  logout = async (req, res) => {
    try {
      req.session = null;
      return res.sendStatus(200).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to logout ${this.itemName}.` })
        .end();
    }
  };
  status = async (req, res) => {
    try {
      if (req.session.token) return res.sendStatus(200);
      else return res.sendStatus(401);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to verify ${this.itemName} auth status.` })
        .end();
    }
  };
  refresh = async (req, res) => {
    try {
      const user = await this.repository.findOne(req.params.id);
      if (!user) return res.sendStatus(401);

      const token = AuthService.generateToken(user.id);

      return res.status(200).json({ token: token }).end();
    } catch (error) {
      console.error(error);

      return res
        .status(500)
        .json({ error: `Failed to authenticate ${this.itemName}.` })
        .end();
    }
  };
};
