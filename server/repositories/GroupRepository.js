const Repository = require("./Repository.js");
require("dotenv").config();

module.exports = class GroupRepository extends Repository {
  findAll = async (page) => {
    let pagination = {};
    if (page) pagination.skip = Number(process.env.PAGINATION_PROFILE) * page;

    return await this.entity.model.findMany({
      take: Number(process.env.PAGINATION_PROFILE),
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
