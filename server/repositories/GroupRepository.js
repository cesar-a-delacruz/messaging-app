const Repository = require("./Repository.js");

module.exports = class GroupRepository extends Repository {
  findOne = async (id) =>
    await this.entity.model.findUnique({
      where: { id },
      include: {
        chats: {
          select: {
            id: true,
          },
        },
      },
    });
  create = async (data, members) =>
    await this.entity.model.create({
      data: {
        ...this.entity.parseData(data),
        chats: { create: { chatMembers: { create: members } } },
      },
    });
};
