const Controller = require("./Controller.js");
const MessageController = require("./MessageController.js");
const FileController = require("./FileController.js");
const ChatController = require("./ChatController.js");
const repositories = require("../repositories/index.js");
const validators = require("../validators/index.js");

module.exports = {
  user: new FileController(repositories.user, validators.user, "image"),
  message: new MessageController(
    repositories.message,
    validators.message,
    "attachment",
  ),
  chat: new ChatController(repositories.chat, validators.chat),
};
