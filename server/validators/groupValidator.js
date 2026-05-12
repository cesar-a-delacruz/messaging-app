const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  name: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "name"),
    },
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: formatValidationError("length", "name", {
        min: 5,
        max: 20,
      }),
    },
  },
  info: {
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: formatValidationError("length", "info", {
        min: 1,
        max: 100,
      }),
    },
  },
});
