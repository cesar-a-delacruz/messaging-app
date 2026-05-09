const { Strategy, ExtractJwt } = require("passport-jwt");
const dotenv = require("dotenv");
const { PrismaClient } = require("../generated/prisma");

dotenv.config();

module.exports = {
  strategy: new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await new PrismaClient().user.findFirst({
          where: { id: payload.id },
        });

        if (!user) return done(null, false, { message: "Incorrect username" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
};
