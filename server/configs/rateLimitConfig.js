const rateLimit = require("express-rate-limit").rateLimit;
module.exports = {
  baseLimit: rateLimit({
    windowMs: 1000 * 60 * 5,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => {
      res.status(429).json({
        error: "Too many requests, try again after 5 minutes.",
      });
      next();
    },
  }),
  authLimit: rateLimit({
    windowMs: 1000 * 60 * 5,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    handler: (req, res, next) => {
      res.status(429).json({
        error: "Too many requests, try again after 5 minutes.",
      });
      next();
    },
  }),
};
