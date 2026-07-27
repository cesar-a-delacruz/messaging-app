const Repository = require("./Repository.js");
const MessageRepository = require("./MessageRepository.js");
const ChatRepository = require("./ChatRepository.js");
const UserRepository = require("./UserRepository.js");
const GroupRepository = require("./GroupRepository.js");
const entities = require("../entities/index.js");

module.exports = {
  user: new UserRepository(entities.user),
  message: new MessageRepository(entities.message),
  chat: new ChatRepository(entities.chat),
  chat: new ChatRepository(entities.chat),
  chatMember: new Repository(entities.chatMember),
  group: new GroupRepository(entities.group),
};
