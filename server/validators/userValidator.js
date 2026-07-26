const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  username: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "username"),
    },
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: formatValidationError("length", "username", {
        min: 5,
        max: 20,
      }),
    },
  },
  fullname: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "fullname"),
    },
    isLength: {
      options: { min: 5, max: 40 },
    },
  },
  bio: {
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
