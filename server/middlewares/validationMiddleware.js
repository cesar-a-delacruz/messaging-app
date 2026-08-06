const { validationResult } = require("express-validator");

module.exports = async (validator, itemName, req, res, next) => {
  await validator.run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ message: `Invalid ${itemName}:`, errors: errors.mapped() })
      .end();
  next();
};
