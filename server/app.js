const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authConfig = require("./configs/authConfig.js");
const routes = require("./routes/index.js");
const cookieSession = require("cookie-session");
const { baseLimit } = require("./configs/rateLimitConfig.js");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT, credentials: true }));
passport.use(authConfig.strategy);
app.use(
  cookieSession({
    name: "session",
    secret: process.env.JWT_SECRET,
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
  }),
);
app.use(baseLimit);

for (const route in routes) {
  app.use(routes[route].router);
}

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
