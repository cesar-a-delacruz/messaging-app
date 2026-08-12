const CRUDRouter = require("./CRUDRouter.js");
const Router = require("./Router.js");
const controllers = require("../controllers/index.js");
const authorizationMiddleware = require("../middlewares/authorizationMiddleware.js");
const { authLimit } = require("../configs/rateLimitConfig.js");

module.exports = {
  auth: new Router("auth", controllers.auth)
    .route(
      "put",
      "updateCredentials",
      "credentials/:id",
      authorizationMiddleware,
    )
    .route("post", "login", "", authLimit)
    .route("get", "logout", "logout")
    .route("get", "refresh", "refresh/:id")
    .route("get", "status", "status"),
  user: new Router("user", controllers.user)
    .route("get", "findOne", ":id", authorizationMiddleware)
    .route("get", "findAll", "not/logged/:page", authorizationMiddleware)
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
  ).route(
    "get",
    "findAllByChat",
    "chat/:chatId/:page",
    authorizationMiddleware,
  ),
  chat: new CRUDRouter("chat", controllers.chat, authorizationMiddleware)
    .route("get", "findAllByUser", "user/logged/:page", authorizationMiddleware)
    .route(
      "get",
      "findOneByUsers",
      "otherUser/:otherUserId",
      authorizationMiddleware,
    )
    .route("get", "findOneByGroup", "group/:groupId", authorizationMiddleware),
  chatMember: new CRUDRouter(
    "chatMember",
    controllers.chatMember,
    authorizationMiddleware,
  ).route("get", "findAll", "group/:groupId", authorizationMiddleware),
  group: new CRUDRouter(
    "group",
    controllers.group,
    authorizationMiddleware,
  ).route("get", "findAll", "all/:page", authorizationMiddleware),
};
