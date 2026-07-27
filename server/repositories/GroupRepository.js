const Repository = require("./Repository.js");

module.exports = class GroupRepository extends Repository {
  findOne = async (id) => {
    const result = await this.entity.model.findUnique({
      where: { id },
      include: {
        chats: {
          select: {
            chatMembers: {
              select: {
                id: true,
                role: true,
                user: {
                  select: {
                    id: true,
                    username: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!result) throw new Error("This row doesn't exists");

    return result;
  };
};
