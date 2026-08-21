const jwt = require("jsonwebtoken");
const AuthService = require("../services/AuthService");
const userRepository = require("../repositories/index.js").user;

module.exports = async (req, res, next) => {
  const accessToken = req.session.accessToken;
  const refreshToken = req.session.refreshToken;

  if (!refreshToken) res.sendStatus(401);
  const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);

  const user = await userRepository.findOne(payload.id);
  if (!user) return res.sendStatus(403);
  if (!accessToken) req.session.accessToken = AuthService.access(payload.id);

  req.user = payload;
  next();
};
