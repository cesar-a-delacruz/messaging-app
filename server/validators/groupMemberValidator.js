const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  role: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "role"),
    },
  },
});
