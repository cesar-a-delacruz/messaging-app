const MessageController = require("./MessageController.js");
const UserController = require("./UserController.js");
const ChatController = require("./ChatController.js");
const repositories = require("../repositories/index.js");
const validators = require("../validators/index.js");
const ChatMemberController = require("./ChatMemberController.js");
const GroupController = require("./GroupController.js");

module.exports = {
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
