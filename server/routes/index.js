const Router = require("./Router.js");
const controllers = require("../controllers/index.js");

module.exports = {
  user: new Router("user", controllers.user)
    .routeREST()
    .route("get", "not/:userId", "findAll"),
  message: new Router("message", controllers.message)
    .routeREST()
    .route("get", "chat/:chatId", "findAllByChat"),
  chat: new Router("chat", controllers.chat)
    .routeREST()
    .route("get", "user/:userId", "findAllByUser")
    .route(
      "get",
      "loggedUser/:loggedUserId/otherUser/:otherUserId",
      "findOneByUsers",
    ),
};
