const Repository = require("./Repository.js");
require("dotenv").config();

module.exports = class ChatRepository extends Repository {
  findAllByUser = async (userId, page) => {
    let pagination = {};
    if (page) pagination.skip = Number(process.env.PAGINATION_PROFILE) * page;

    return await this.entity.model.findMany({
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
      take: Number(process.env.PAGINATION_PROFILE),
      ...pagination,
    });
  };
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
          take: Number(process.env.PAGINATION_MESSAGE),
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
          take: Number(process.env.PAGINATION_MESSAGE),
        },
      },
    });
};
