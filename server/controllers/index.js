const Controller = require("./Controller.js");
const MessageController = require("./MessageController.js");
const UserController = require("./UserController.js");
const ChatController = require("./ChatController.js");
const repositories = require("../repositories/index.js");
const validators = require("../validators/index.js");
const ChatMemberController = require("./ChatMemberController.js");
const GroupController = require("./GroupController.js");

module.exports = {
  user: new UserController(repositories.user, validators.user, "image"),
  message: new MessageController(
    repositories.message,
    validators.message,
    "attachment",
  ),
  chat: new ChatController(repositories.chat),
  chatMember: new ChatMemberController(repositories.chatMember),
  group: new GroupController(repositories.group, validators.group, "image"),
};
