const Repository = require("./Repository.js");
const entities = require("../entities/index.js");

module.exports = {
  user: new Repository(entities.user),
  message: new Repository(entities.message),
  group: new Repository(entities.group),
  groupMember: new Repository(entities.groupMember),
};
