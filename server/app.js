const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const authConfig = require("./configs/authConfig.js");
const { authenticate, refresh } = require("./middlewares/jwtMiddlewares.js");
const routes = require("./routes/index.js");

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT }));
passport.use(authConfig.strategy);

app.post("/auth", authenticate);
app.get("/refresh/:id", refresh);

for (const route in routes) {
  app.use("/", routes[route]);
}

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
