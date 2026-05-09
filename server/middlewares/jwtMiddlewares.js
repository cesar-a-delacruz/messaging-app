const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { compare } = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");

dotenv.config();

module.exports = {
  authenticate: async (req, res) => {
    const { username, password } = req.body;

    const user = await new PrismaClient().user.findFirst({
      where: {
        username: username,
      },
    });

    const match = await compare(password, user.password);
    if (!match) return res.sendStatus(401);

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return res
      .status(200)
      .json({ message: "Successful authentication", token })
      .end();
  },
  autorize: async (req, res, next) => {
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
    const user = await new PrismaClient().user.findFirst({
      where: { id: Number(req.params.id) },
    });
    if (!user) return res.sendStatus(401);

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ message: "Successful refresh", token: token })
      .end();
  },
};
