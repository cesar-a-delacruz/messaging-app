const Repository = require("./Repository.js");

module.exports = class MessageRepository extends Repository {
  findLatest = async (userId) => {
    let result = await this.entity.model.findFirst({
      where: { senderId: userId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        content: true,
      },
    });
    if (!result)
      result = await this.entity.model.findFirst({
        where: { receiverId: userId },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          content: true,
        },
      });

    if (!result) throw new Error("No matching rows were found");

    return result;
  };
  findChat = async (senderId, receiverId) => {
    const result = await this.entity.model.findMany({
      where: {
        OR: [
          { AND: { senderId: senderId, receiverId: receiverId } },
          { AND: { senderId: receiverId, receiverId: senderId } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        content: true,
        attachment: true,
        createdAt: true,
        senderId: true,
      },
    });
    if (!result.length) throw new Error("No matching rows were found");

    return result;
  };
};
