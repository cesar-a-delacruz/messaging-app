const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  role: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "role"),
    },
  },
});
