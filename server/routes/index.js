const Router = require("./Router.js");
const controllers = require("../controllers/index.js");

module.exports = {
  user: new Router("user", controllers.user).routeREST(),
  message: new Router("message", controllers.message)
    .routeREST()
    .route("get", "chat/:chatId", "findOneByChat"),
  chat: new Router("chat", controllers.chat)
    .routeREST()
    .route("get", "user/:userId", "findAllByUser"),
};
