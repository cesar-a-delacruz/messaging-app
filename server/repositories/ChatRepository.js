const Repository = require("./Repository.js");

module.exports = class ChatRepository extends Repository {
  findAllByUser = async (userId) => {
    const result = await this.entity.model.findMany({
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
    if (!result.length) throw new Error("No matching rows were found.");

    return result;
  };
  findOneByUsers = async (loggedUserId, otherUserId) => {
    const result = await this.entity.model.findFirst({
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
        },
      },
    });
    if (!result) throw new Error("This row doesn't exists.");

    return result;
  };
  findOneByGroup = async (groupId) => {
    const result = await this.entity.model.findFirst({
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
        },
      },
    });
    if (!result) throw new Error("This row doesn't exists.");

    return result;
  };
};
