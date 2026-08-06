const { validationResult } = require("express-validator");

module.exports = async (validator, itemName, req, res, next) => {
  await validator.run(req);
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors = errors.mapped();
    let errorMessage = `Invalid ${itemName}:`;
    Object.keys(errors).forEach((error) => {
      errorMessage += `\n${errors[error].msg}.`;
    });

    return res.status(422).json({ error: errorMessage }).end();
  }
  next();
};
