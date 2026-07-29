const Repository = require("./Repository.js");

module.exports = class ChatRepository extends Repository {
  findAllByUser = async (userId) => {
    console.log(userId);
    const result = await this.entity.model.findMany({
      where: {
        chatMembers: {
          some: {
            userId: userId,
          },
        },
      },
      distinct: ["id"],
      select: {
        id: true,
        chatMembers: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                fullname: true,
                username: true,
                image: true,
              },
            },
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
        group: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    console.log(result);
    if (!result.length) throw new Error("No matching rows were found");

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
  findOneByUserAndGroup = async (userId, groupId) => {
    const result = await this.entity.model.findFirst({
      where: {
        AND: [
          {
            chatMembers: {
              some: {
                userId: userId,
              },
            },
          },
          { groupId: groupId },
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
