const dbConfig = require("../configs/dbConfig.js");

(async function main() {
  const users = await dbConfig.user.createManyAndReturn({
    data: [
      {
        username: "fakeuser1",
        fullname: "fake user 1",
        password: "fakepassword",
      },
      {
        username: "fakeuser2",
        fullname: "fake user 2",
        password: "fakepassword",
        bio: "fake bio 2",
      },
      {
        username: "fakeuser3",
        fullname: "fake user 3",
        password: "fakepassword",
        bio: "fake bio 3",
        image: "/user.webp",
      },
    ],
  });
  const groups = await dbConfig.group.createManyAndReturn({
    data: [
      { name: "fake group 1", info: "fake info 1" },
      { name: "fake group 2", info: "fake info 2", image: "/user.webp" },
    ],
  });
  const chats = await dbConfig.chat.createManyAndReturn({
    data: [{}, {}, { groupId: groups[0].id }, { groupId: groups[1].id }],
  });
  const chatMembers = await dbConfig.chatMember.createManyAndReturn({
    data: [
      { userId: users[0].id, chatId: chats[0].id },
      { userId: users[1].id, chatId: chats[0].id },
      { userId: users[0].id, chatId: chats[1].id },
      { userId: users[2].id, chatId: chats[1].id },
      { userId: users[0].id, chatId: chats[2].id },
      { userId: users[1].id, chatId: chats[2].id },
      { userId: users[2].id, chatId: chats[2].id },
      { userId: users[0].id, chatId: chats[3].id },
      { userId: users[2].id, chatId: chats[3].id },
    ],
  });
  const messages = await dbConfig.message.createManyAndReturn({
    data: [
      {
        content: "fake content 1",
        chatId: chats[0].id,
        authorId: users[0].id,
      },
      {
        content: "fake content 2",
        chatId: chats[0].id,
        authorId: users[1].id,
      },
      {
        content: "fake content 3",
        attachment: "/user.webp",
        chatId: chats[0].id,
        authorId: users[0].id,
      },
      {
        content: "",
        attachment: "/user.webp",
        chatId: chats[1].id,
        authorId: users[0].id,
      },
      {
        content: "fake content 4",
        chatId: chats[1].id,
        authorId: users[2].id,
      },
      {
        content: "fake content 5",
        chatId: chats[1].id,
        authorId: users[2].id,
      },
      {
        content: "fake content 6",
        chatId: chats[2].id,
        authorId: users[0].id,
      },
      {
        content: "fake content 7",
        chatId: chats[2].id,
        authorId: users[1].id,
      },
      {
        content: "fake content 8",
        attachment: "/user.webp",
        chatId: chats[2].id,
        authorId: users[0].id,
      },
      {
        content: "",
        attachment: "/user.webp",
        chatId: chats[3].id,
        authorId: users[0].id,
      },
      {
        content: "fake content 9",
        chatId: chats[3].id,
        authorId: users[2].id,
      },
      {
        content: "fake content 10",
        chatId: chats[3].id,
        authorId: users[2].id,
      },
    ],
  });
})()
  .then(async () => await dbConfig.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await dbConfig.$disconnect();
  });
