const Repository = require("./Repository.js");

module.exports = class GroupRepository extends Repository {
  findOne = async (id) => {
    const result = await this.entity.model.findUnique({
      where: { id },
      include: {
        chats: {
          select: {
            id: true,
            chatMembers: {
              omit: { chatId: true, userId: true },
              include: {
                user: {
                  omit: {
                    image: true,
                    bio: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!result) throw new Error("This row doesn't exists.");

    return result;
  };
};
