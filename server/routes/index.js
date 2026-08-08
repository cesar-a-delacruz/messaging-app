const CRUDRouter = require("./CRUDRouter.js");
const Router = require("./Router.js");
const controllers = require("../controllers/index.js");
const authorizationMiddleware = require("../middlewares/authorizationMiddleware.js");

module.exports = {
  auth: new Router("auth", controllers.auth)
    .route(
      "put",
      "updateCredentials",
      "credentials/:id",
      authorizationMiddleware,
    )
    .route("post", "authenticate")
    .route("get", "refresh", "refresh/:id"),
  user: new Router("user", controllers.user)
    .route("get", "findOne", ":id", authorizationMiddleware)
    .route("get", "findAll", "not/:userId", authorizationMiddleware)
    .route(
      "get",
      "findAllNotInChat",
      "not/chat/:chatId",
      authorizationMiddleware,
    )
    .route("post", "create")
    .route("put", "update", ":id", authorizationMiddleware)
    .route("delete", "delete", ":id", authorizationMiddleware),
  message: new CRUDRouter(
    "message",
    controllers.message,
    authorizationMiddleware,
  ).route("get", "findAllByChat", "chat/:chatId", authorizationMiddleware),
  chat: new CRUDRouter("chat", controllers.chat, authorizationMiddleware)
    .route("get", "findAllByUser", "user/:userId", authorizationMiddleware)
    .route(
      "get",
      "findOneByUsers",
      "loggedUser/:loggedUserId/otherUser/:otherUserId",
      authorizationMiddleware,
    )
    .route("get", "findOneByGroup", "group/:groupId", authorizationMiddleware),
  chatMember: new CRUDRouter(
    "chatMember",
    controllers.chatMember,
    authorizationMiddleware,
  ).route("get", "findAll", "group/:groupId", authorizationMiddleware),
  group: new CRUDRouter("group", controllers.group, authorizationMiddleware),
};
