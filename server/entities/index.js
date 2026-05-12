const Entity = require("./Entity.js");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma/index.js");
require("dotenv").config();

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

module.exports = {
  user: new Entity(prisma.user, {
    username: "string",
    fullname: "string",
    password: "string",
    bio: "string",
    image: "string",
  }),
  message: new Entity(prisma.message, {
    content: "string",
    attachment: "string",
    createdAt: "date",
    updatedAt: "date",
    senderId: "string",
    receiverId: "string",
  }),
  group: new Entity(prisma.group, {
    name: "string",
    info: "string",
    image: "string",
    createdAt: "date",
  }),
  groupMember: new Entity(prisma.groupMember, {
    role: "string",
    createdAt: "date",
    updatedAt: "date",
    userId: "string",
    groupId: "string",
  }),
};
