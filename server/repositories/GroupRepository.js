const Repository = require("./Repository.js");

module.exports = class GroupRepository extends Repository {
  findOne = async (id) => {
    const result = await this.entity.model.findUnique({
      where: { id },
      include: {
        chats: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!result) throw new Error("This row doesn't exists.");

    return result;
  };
  create = async (data, members) => {
    const result = await this.entity.model.create({
      data: {
        ...this.entity.parseData(data),
        chats: { create: { chatMembers: { create: members } } },
      },
    });
    return result;
  };
};
