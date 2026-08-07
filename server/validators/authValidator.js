const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  username: {
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: formatValidationError("length", "username", {
        min: 5,
        max: 20,
      }),
    },
    optional: true,
  },
  password: {
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: formatValidationError("length", "password", {
        min: 5,
        max: 20,
      }),
    },
    optional: true,
  },
});
