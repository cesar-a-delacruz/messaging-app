const Repository = require("./Repository.js");
const { hash } = require("bcryptjs");

module.exports = class UserRepository extends Repository {
  findAll = async (userId) => {
    const result = await this.entity.model.findMany({
      where: { NOT: { id: userId } },
    });
    if (!result.length) throw new Error("No matching rows were found.");

    return result;
  };
  findAllNotInChat = async (chatId) => {
    const result = await this.entity.model.findMany({
      where: { NOT: { chatMember: { some: { chatId } } } },
      omit: { fullname: true, bio: true },
    });
    if (!result.length) throw new Error("No matching rows were found.");

    return result;
  };
  create = async (data) => {
    data = this.entity.parseData(data);
    data.password = await hash(data.password, 10);

    const result = await this.entity.model.create({
      data,
    });
    return result;
  };
};
