const jwt = require("jsonwebtoken");
const AuthService = require("../services/AuthService");

module.exports = async (req, res, next) => {
  const accessToken = req.session.accessToken;
  const refreshToken = req.session.refreshToken;

  if (!refreshToken) res.sendStatus(401);

  jwt.verify(refreshToken, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.sendStatus(403);

    if (!accessToken) req.session.accessToken = AuthService.access(user.id);
    req.user = user;
    next();
  });
};
