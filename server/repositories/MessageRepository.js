const Repository = require("./Repository.js");

module.exports = class MessageRepository extends Repository {
  findLatest = async (userId) => {
    const result = await this.entity.model.findFirst({
      where: {
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
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
        createdAt: "asc",
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
