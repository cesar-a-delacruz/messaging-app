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
  const chats = await dbConfig.chat.createManyAndReturn({
    data: [
      {
        firstUserId: users[0].id,
        secondUserId: users[1].id,
      },
      {
        firstUserId: users[0].id,
        secondUserId: users[2].id,
      },
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
    ],
  });
})()
  .then(async () => await dbConfig.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await dbConfig.$disconnect();
  });
