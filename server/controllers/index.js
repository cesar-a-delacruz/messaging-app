const Controller = require("./Controller.js");
const repositories = require("../repositories/index.js");
const validators = require("../validators/index.js");

module.exports = {
  user: new Controller(repositories.user, validators.user),
  message: new Controller(repositories.message, validators.message),
  group: new Controller(repositories.group, validators.group),
  groupMember: new Controller(repositories.groupMember, validators.groupMember),
};
