const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  content: {
    isLength: {
      options: { min: 1, max: 200 },
    },
  },
});
