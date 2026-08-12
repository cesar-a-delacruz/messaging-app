const Repository = require("./Repository.js");

module.exports = class MessageRepository extends Repository {
  findAllByChat = async (chatId, page) => {
    let pagination = {};
    if (page) pagination.skip = Number(process.env.PAGINATION_MESSAGE) * page;

    return await this.entity.model.findMany({
      where: { chatId },
      omit: { chatId: true },
      orderBy: {
        createdAt: "desc",
      },
      take: Number(process.env.PAGINATION_MESSAGE),
      ...pagination,
    });
  };
};
