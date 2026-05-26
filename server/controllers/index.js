const Controller = require("./Controller.js");
const MessageController = require("./MessageController.js");
const UserController = require("./UserController.js");
const repositories = require("../repositories/index.js");
const validators = require("../validators/index.js");

module.exports = {
  user: new UserController(repositories.user, validators.user),
  message: new MessageController(repositories.message, validators.message),
};
