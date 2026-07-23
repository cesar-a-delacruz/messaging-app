const Repository = require("./Repository.js");
const MessageRepository = require("./MessageRepository.js");
const ChatRepository = require("./ChatRepository.js");
const entities = require("../entities/index.js");

module.exports = {
  user: new Repository(entities.user),
  message: new MessageRepository(entities.message),
  chat: new ChatRepository(entities.chat),
};
