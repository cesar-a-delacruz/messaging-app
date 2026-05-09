const { validationResult } = require("express-validator");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ message: "Invalid item:", errors: errors.mapped() })
      .end();
  next();
};
