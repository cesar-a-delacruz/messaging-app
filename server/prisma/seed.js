const dbConfig = require("../configs/dbConfig.js");
const { hash, genSaltSync } = require("bcryptjs");

(async function main() {
  const users = await dbConfig.user.createManyAndReturn({
    data: [
      {
        username: "fakeuser1",
        fullname: "fake user 1",
        password: await hash("fakepassword", genSaltSync()),
      },
      {
        username: "fakeuser2",
        fullname: "fake user 2",
        password: await hash("fakepassword", genSaltSync()),
        bio: "fake bio 2",
      },
      {
        username: "fakeuser3",
        fullname: "fake user 3",
        password: await hash("fakepassword", genSaltSync()),
        bio: "fake bio 3",
        image: "/user.webp",
      },
      {
        username: "fakeuser4",
        fullname: "fake user 4",
        password: await hash("fakepassword", genSaltSync()),
        bio: "fake bio 3",
        image: "/user.webp",
      },
    ],
  });
  const groups = await dbConfig.group.createManyAndReturn({
    data: [
      { name: "fake group 1", info: "fake info 1" },
      { name: "fake group 2", info: "fake info 2", image: "/user.webp" },
      { name: "fake group 3", info: "fake info 3" },
    ],
  });
  const chats = await dbConfig.chat.createManyAndReturn({
    data: [
      {},
      {},
      { groupId: groups[0].id },
      { groupId: groups[1].id },
      { groupId: groups[2].id },
    ],
  });
  const chatMembers = await dbConfig.chatMember.createManyAndReturn({
    data: [
      { userId: users[0].id, chatId: chats[0].id },
      { userId: users[1].id, chatId: chats[0].id },
      { userId: users[0].id, chatId: chats[1].id },
      { userId: users[2].id, chatId: chats[1].id },
      { userId: users[1].id, chatId: chats[2].id, role: "ADMIN" },
      { userId: users[2].id, chatId: chats[2].id },
      { userId: users[0].id, chatId: chats[3].id },
      { userId: users[2].id, chatId: chats[3].id, role: "ADMIN" },
      { userId: users[0].id, chatId: chats[4].id, role: "ADMIN" },
      { userId: users[3].id, chatId: chats[4].id },
    ],
  });
  const messages = await dbConfig.message.createManyAndReturn({
    data: [
      {
        content: "fake content 1",
        chatId: chats[0].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 21),
      },
      {
        content: "fake content 2",
        chatId: chats[0].id,
        authorId: users[1].id,
        createdAt: new Date(2026, 8 - 1, 22),
      },
      {
        content: "fake content 3",
        attachment: "/user.webp",
        chatId: chats[0].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 23),
      },
      {
        content: "fake content 0",
        attachment: "/user.webp",
        chatId: chats[0].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 20),
      },
      {
        content: "fake content 0",
        attachment: "/user.webp",
        chatId: chats[0].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 19),
      },
      {
        content: "fake content 0",
        attachment: "/user.webp",
        chatId: chats[0].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 18),
      },
      {
        content: "fake content 0",
        attachment: "/user.webp",
        chatId: chats[0].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 17),
      },
      {
        content: "fake content 0",
        attachment: "/user.webp",
        chatId: chats[0].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 16),
      },
      {
        content: "fake content 0",
        attachment: "/user.webp",
        chatId: chats[0].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 15),
      },
      {
        content: "",
        attachment: "/user.webp",
        chatId: chats[1].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 24),
      },
      {
        content: "fake content 4",
        chatId: chats[1].id,
        authorId: users[2].id,
        createdAt: new Date(2026, 8 - 1, 25),
      },
      {
        content: "fake content 5",
        chatId: chats[1].id,
        authorId: users[2].id,
        createdAt: new Date(2026, 8 - 1, 26),
      },
      {
        content: "fake content 6",
        chatId: chats[2].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 27),
      },
      {
        content: "fake content 7",
        chatId: chats[2].id,
        authorId: users[1].id,
        createdAt: new Date(2026, 8 - 1, 28),
      },
      {
        content: "fake content 8",
        attachment: "/user.webp",
        chatId: chats[2].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 29),
      },
      {
        content: "",
        attachment: "/user.webp",
        chatId: chats[3].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 8 - 1, 30),
      },
      {
        content: "fake content 9",
        chatId: chats[3].id,
        authorId: users[2].id,
        createdAt: new Date(2026, 9 - 1, 1),
      },
      {
        content: "fake content 10",
        chatId: chats[3].id,
        authorId: users[2].id,
        createdAt: new Date(2026, 9 - 1, 2),
      },
      {
        content: "fake content 11",
        chatId: chats[4].id,
        authorId: users[0].id,
        createdAt: new Date(2026, 9 - 1, 3),
      },
      {
        content: "fake content 12",
        chatId: chats[4].id,
        authorId: users[3].id,
        createdAt: new Date(2026, 9 - 1, 4),
      },
    ],
  });
})()
  .then(async () => await dbConfig.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await dbConfig.$disconnect();
  });
