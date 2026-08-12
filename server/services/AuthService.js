const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");

module.exports = {
  authenticate: async (password, user) => {
    const match = await compare(password, user.password);
    if (!match) return null;

    return jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "7d" });
  },
  access: (userId) =>
    jwt.sign(
      {
        id: userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: "900000" },
    ),
};
