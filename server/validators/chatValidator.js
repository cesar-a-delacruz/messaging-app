const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  firstUserId: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "firstUserId"),
    },
  },
  secondUserId: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "secondUserId"),
    },
  },
});
