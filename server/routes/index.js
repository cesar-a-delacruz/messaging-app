const CRUDRouter = require("./CRUDRouter.js");
const Router = require("./Router.js");
const controllers = require("../controllers/index.js");
const { authorize } = require("../middlewares/jwtMiddlewares.js");

module.exports = {
  auth: new Router("auth", controllers.auth).route(
    "put",
    "updateCredentials",
    "credentials/:id",
    authorize,
  ),
  user: new Router("user", controllers.user)
    .route("get", "findOne", ":id", authorize)
    .route("get", "findAll", "not/:userId", authorize)
    .route("get", "findAllNotInChat", "not/chat/:chatId", authorize)
    .route("post", "create")
    .route("put", "update", ":id", authorize)
    .route("delete", "delete", ":id", authorize),
  message: new CRUDRouter("message", controllers.message, authorize).route(
    "get",
    "findAllByChat",
    "chat/:chatId",
  ),
  chat: new CRUDRouter("chat", controllers.chat, authorize)
    .route("get", "findAllByUser", "user/:userId")
    .route(
      "get",
      "findOneByUsers",
      "loggedUser/:loggedUserId/otherUser/:otherUserId",
    )
    .route("get", "findOneByGroup", "group/:groupId", authorize),
  chatMember: new CRUDRouter(
    "chatMember",
    controllers.chatMember,
    authorize,
  ).route("get", "findAll", "group/:groupId"),
  group: new CRUDRouter("group", controllers.group, authorize),
};
