const CRUDRouter = require("./CRUDRouter.js");
const controllers = require("../controllers/index.js");

module.exports = {
  user: new CRUDRouter("user", controllers.user)
    .route("get", "findAll", "not/:userId")
    .route("get", "findAllNotInChat", "not/chat/:chatId"),
  message: new CRUDRouter("message", controllers.message).route(
    "get",
    "findAllByChat",
    "chat/:chatId",
  ),
  chat: new CRUDRouter("chat", controllers.chat)
    .route("get", "findAllByUser", "user/:userId")
    .route(
      "get",
      "findOneByUsers",
      "loggedUser/:loggedUserId/otherUser/:otherUserId",
    )
    .route("get", "findOneByGroup", "group/:groupId"),
  chatMember: new CRUDRouter("chatMember", controllers.chatMember).route(
    "get",
    "findAll",
    "group/:groupId",
  ),
  group: new CRUDRouter("group", controllers.group),
};
