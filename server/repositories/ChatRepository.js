const Repository = require("./Repository.js");

module.exports = class ChatRepository extends Repository {
  findAllByUser = async (userId) =>
    await this.entity.model.findMany({
      where: {
        AND: [
          {
            chatMembers: {
              some: {
                userId,
              },
            },
          },
          { messages: { some: {} } },
        ],
      },
      distinct: ["id"],
      select: {
        id: true,
        chatMembers: {
          select: {
            id: true,
            user: {
              omit: {
                fullname: true,
                bio: true,
              },
            },
          },
        },
        messages: {
          select: {
            content: true,
            attachment: true,
            createdAt: true,
          },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        group: {
          omit: {
            info: true,
          },
        },
      },
    });
  findOneByUsers = async (loggedUserId, otherUserId) =>
    await this.entity.model.findFirst({
      where: {
        AND: [
          {
            chatMembers: {
              some: {
                userId: loggedUserId,
              },
            },
          },
          {
            chatMembers: {
              some: {
                userId: otherUserId,
              },
            },
          },
          { groupId: null },
        ],
      },
      select: {
        id: true,
        messages: {
          omit: {
            chatId: true,
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });
  findOneByGroup = async (groupId) =>
    await this.entity.model.findFirst({
      where: {
        groupId,
      },
      select: {
        id: true,
        messages: {
          omit: {
            chatId: true,
          },
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    });
};
