const Repository = require("./Repository.js");

module.exports = class MessageRepository extends Repository {
  findLatest = async (userId) => {
    let result = await this.entity.model.findFirst({
      where: { senderId: userId },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        content: true,
      },
    });
    if (!result)
      result = await this.entity.model.findFirst({
        where: { receiverId: userId },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          content: true,
        },
      });

    if (!result) throw new Error("No matching rows were found");

    return result;
  };
};
