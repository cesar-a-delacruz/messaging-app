const Repository = require("./Repository.js");

module.exports = class MessageRepository extends Repository {
  findOneByChat = async (chatId) => {
    const result = await this.entity.model.findMany({
      where: { chatId },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        content: true,
        attachment: true,
        createdAt: true,
        authorId: true,
      },
    });
    if (!result.length) throw new Error("No matching rows were found");

    return result;
  };
};
