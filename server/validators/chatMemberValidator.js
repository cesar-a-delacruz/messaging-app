const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  userId: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "userId"),
    },
  },
  chatId: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "chatId"),
    },
  },
});
