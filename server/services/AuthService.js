const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
require("dotenv").config();

module.exports = {
  authenticate: async (password, user) => {
    const match = await compare(password, user.password);
    if (!match) return null;

    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
  },
  generateToken: (userId) =>
    jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    ),
};
