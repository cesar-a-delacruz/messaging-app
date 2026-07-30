const Repository = require("./Repository.js");

module.exports = class MessageRepository extends Repository {
  findAllByChat = async (chatId) => {
    const result = await this.entity.model.findMany({
      where: { chatId },
      omit: { chatId: true },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (!result.length) throw new Error("No matching rows were found.");

    return result;
  };
};
