const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  username: {
    isEmpty: {
      negated: true,
    },
    isLength: {
      options: { min: 5, max: 20 },
    },
  },
  fullname: {
    isEmpty: {
      negated: true,
    },
    isLength: {
      options: { min: 5, max: 40 },
    },
  },
  password: {
    isEmpty: {
      negated: true,
    },
    isLength: {
      options: { min: 8, max: 60 },
    },
  },
  bio: {
    isLength: {
      options: { max: 100 },
    },
  },
});
