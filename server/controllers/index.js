const UserController = require("./UserController.js");
const MessageController = require("./MessageController.js");
const ChatController = require("./ChatController.js");
const repositories = require("../repositories/index.js");
const validators = require("../validators/index.js");
const ChatMemberController = require("./ChatMemberController.js");
const GroupController = require("./GroupController.js");
const AuthController = require("./AuthController.js");

module.exports = {
  auth: new AuthController("user", repositories.user, validators.auth),
  user: new UserController("user", repositories.user, validators.user, "image"),
  message: new MessageController(
    "message",
    repositories.message,
    validators.message,
    "attachment",
  ),
  chat: new ChatController("chat", repositories.chat),
  chatMember: new ChatMemberController("chat member", repositories.chatMember),
  group: new GroupController(
    "group",
    repositories.group,
    validators.group,
    "image",
  ),
};
