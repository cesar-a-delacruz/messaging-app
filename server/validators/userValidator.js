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
  password: {
    isEmpty: {
      negated: true,
      errorMessage: formatValidationError("empty", "password"),
    },
    isLength: {
      options: { min: 8, max: 60 },
      errorMessage: formatValidationError("length", "password", {
        min: 8,
        max: 60,
      }),
    },
  },
  bio: {
    isLength: {
      options: { min: 1, max: 100 },
      errorMessage: formatValidationError("length", "bio", {
        min: 1,
        max: 100,
      }),
    },
    optional: true,
  },
});
