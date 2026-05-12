const { checkSchema } = require("express-validator");
const formatValidationError = require("../utils/formatValidationError.js");

module.exports = checkSchema({
  content: {
    isLength: {
      options: { min: 1, max: 200 },
      errorMessage: formatValidationError("length", "content", {
        min: 1,
        max: 200,
      }),
    },
  },
});
