const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  name: {
    isEmpty: {
      negated: true,
    },
    isLength: {
      options: { min: 5, max: 20 },
    },
  },
  info: {
    isLength: {
      options: { max: 100 },
    },
  },
});
