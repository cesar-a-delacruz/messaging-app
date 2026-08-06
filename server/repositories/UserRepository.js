const Repository = require("./Repository.js");
const { hash } = require("bcryptjs");

module.exports = class UserRepository extends Repository {
  findAll = async (userId) =>
    await this.entity.model.findMany({
      where: { NOT: { id: userId } },
    });
  findAllNotInChat = async (chatId) =>
    await this.entity.model.findMany({
      where: { NOT: { chatMember: { some: { chatId } } } },
      omit: { fullname: true, bio: true },
    });
  create = async (data) => {
    data = this.entity.parseData(data);
    data.password = await hash(data.password, 10);

    return await this.entity.model.create({
      data,
    });
  };
};
