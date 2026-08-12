const Repository = require("./Repository.js");
const { hash } = require("bcryptjs");
require("dotenv").config();

module.exports = class UserRepository extends Repository {
  findAll = async (userId, page) => {
    let pagination = {};
    if (page) pagination.skip = Number(process.env.PAGINATION_PROFILE) * page;

    return await this.entity.model.findMany({
      where: { NOT: { id: userId } },
      take: Number(process.env.PAGINATION_PROFILE),
      ...pagination,
    });
  };
  findAllNotInChat = async (chatId) =>
    await this.entity.model.findMany({
      where: { NOT: { chatMember: { some: { chatId } } } },
      omit: { fullname: true, bio: true },
    });
  findOneByUsername = async (username) =>
    await this.entity.model.findUnique({
      where: { username },
      select: {
        id: true,
        password: true,
      },
    });
  create = async (data) => {
    data = this.entity.parseData(data);
    data.password = await hash(data.password, 10);

    return await this.entity.model.create({
      data,
    });
  };
  updateCredentials = async (id, data) => {
    data = this.entity.parseData(data);
    if (data.password) data.password = await hash(data.password, 10);

    return await this.entity.model.update({
      where: { id },
      data,
    });
  };
};
