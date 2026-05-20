const Repository = require("./Repository.js");
const MessageRepository = require("./MessageRepository.js");
const entities = require("../entities/index.js");

module.exports = {
  user: new Repository(entities.user),
  message: new MessageRepository(entities.message),
  group: new Repository(entities.group),
  groupMember: new Repository(entities.groupMember),
};
