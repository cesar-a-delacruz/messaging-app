const Repository = require("./Repository.js");

module.exports = class GroupRepository extends Repository {
  findAll = async (page) => {
    let pagination = {};
    if (page) pagination.skip = 10 * page;

    return await this.entity.model.findMany({
      take: 10,
      ...pagination,
    });
  };
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
