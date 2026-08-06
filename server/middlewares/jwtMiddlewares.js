const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const dbConfig = require("../configs/dbConfig.js");
require("dotenv").config();

module.exports = {
  authenticate: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await dbConfig.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          password: true,
        },
      });
      if (user === null)
        return res
          .status(400)
          .json({
            error: "Credentials mismatch. Incorrect username.",
          })
          .end();

      const match = await compare(password, user.password);
      if (!match)
        return res
          .status(400)
          .json({
            error: "Credentials mismatch. Incorrect password.",
          })
          .end();

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      return res.status(200).json({ token }).end();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to find user." }).end();
    }
  },
  authorize: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
  refresh: async (req, res) => {
    const user = await dbConfig.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user) return res.sendStatus(401);

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(200).json({ token: token }).end();
  },
};
