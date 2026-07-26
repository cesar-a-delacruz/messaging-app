const Controller = require("./Controller.js");
const MessageController = require("./MessageController.js");
const UserController = require("./UserController.js");
const ChatController = require("./ChatController.js");
const FileController = require("./FileController.js");
const repositories = require("../repositories/index.js");
const validators = require("../validators/index.js");

module.exports = {
  user: new UserController(repositories.user, validators.user, "image"),
  message: new MessageController(
    repositories.message,
    validators.message,
    "attachment",
  ),
  chat: new ChatController(repositories.chat, { run: (req) => req }),
  chatMember: new Controller(repositories.chatMember, validators.chatMember),
  group: new FileController(repositories.group, validators.group, "image"),
};
