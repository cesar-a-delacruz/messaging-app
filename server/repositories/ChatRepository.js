const Repository = require("./Repository.js");

module.exports = class ChatRepository extends Repository {
  findAllByUser = async (userId) => {
    const result = await this.entity.model.findMany({
      where: {
        OR: [{ firstUserId: userId }, { secondUserId: userId }],
      },
      select: {
        id: true,
        firstUser: {
          select: {
            id: true,
            fullname: true,
            username: true,
            image: true,
          },
        },
        secondUser: {
          select: {
            id: true,
            fullname: true,
            username: true,
            image: true,
          },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            content: true,
            attachment: true,
            createdAt: true,
          },
        },
      },
    });
    if (!result.length) throw new Error("No matching rows were found");

    return result;
  };
  findOneByUsers = async (loggedUserId, otherUserId) => {
    const result = await this.entity.model.findFirst({
      where: {
        OR: [
          { AND: { firstUserId: loggedUserId, secondUserId: otherUserId } },
          { AND: { firstUserId: otherUserId, secondUserId: loggedUserId } },
        ],
      },
      select: {
        id: true,
        messages: {
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            content: true,
            attachment: true,
            createdAt: true,
            authorId: true,
          },
        },
      },
    });
    if (!result) throw new Error("No matching rows were found");

    return result;
  };
};
