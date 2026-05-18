const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma/index.js");
require("dotenv").config();

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

(async function main() {
  const users = await prisma.user.createManyAndReturn({
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
  const messages = await prisma.message.createManyAndReturn({
    data: [
      {
        content: "fake content 1",
        senderId: users[0].id,
        receiverId: users[1].id,
      },
      {
        content: "fake content 2",
        senderId: users[0].id,
        receiverId: users[1].id,
      },
      {
        content: "fake content 3",
        attachment: "/user.webp",
        senderId: users[1].id,
        receiverId: users[0].id,
      },
      {
        content: "",
        attachment: "/user.webp",
        senderId: users[1].id,
        receiverId: users[0].id,
      },
      {
        content: "fake content 4",
        senderId: users[1].id,
        receiverId: users[2].id,
      },
      {
        content: "fake content 5",
        senderId: users[2].id,
        receiverId: users[1].id,
      },
    ],
  });
})()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
  });
