const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  name: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "fullname"),
    },
    isLength: {
      options: { min: 5, max: 40 },
    },
  },
  info: {
    isLength: {
      options: { max: 100 },
      errorMessage: formatValidationError("length", "bio", {
        min: 0,
        max: 100,
      }),
    },
    optional: true,
  },
});
