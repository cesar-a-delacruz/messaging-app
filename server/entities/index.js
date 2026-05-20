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
    senderId: "string",
    receiverId: "string",
  }),
  group: new Entity(dbConfig.group, {
    name: "string",
    info: "string",
    image: "string",
    createdAt: "date",
  }),
  groupMember: new Entity(dbConfig.groupMember, {
    role: "string",
    createdAt: "date",
    updatedAt: "date",
    userId: "string",
    groupId: "string",
  }),
};
