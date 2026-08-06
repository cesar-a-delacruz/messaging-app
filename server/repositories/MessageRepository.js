const Repository = require("./Repository.js");

module.exports = class MessageRepository extends Repository {
  findAllByChat = async (chatId) =>
    await this.entity.model.findMany({
      where: { chatId },
      omit: { chatId: true },
      orderBy: {
        createdAt: "asc",
      },
    });
};
