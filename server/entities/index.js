const Entity = require("./Entity.js");
const dbConfig = require("../configs/dbConfig.js");

module.exports = {
  user: new Entity(dbConfig.user, {
    username: "string",
    fullname: "string",
    password: "string",
    bio: "string",
    image: "string",
  }),
  message: new Entity(dbConfig.message, {
    content: "string",
    attachment: "string",
    createdAt: "date",
    updatedAt: "date",
    chatId: "string",
    authorId: "string",
  }),
  chat: new Entity(dbConfig.chat, {
    groupId: "string",
  }),
  chatMember: new Entity(dbConfig.chatMember, {
    userId: "string",
    chatId: "string",
    role: "string",
  }),
  group: new Entity(dbConfig.group, {
    name: "string",
    info: "string",
    image: "string",
  }),
};
