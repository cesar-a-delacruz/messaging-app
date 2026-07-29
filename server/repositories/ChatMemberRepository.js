const Repository = require("./Repository.js");

module.exports = class ChatMemberRepository extends Repository {
  create = async (data) => {
    const result = await this.entity.model.create({
      data: this.entity.parseData(data),
      omit: { chatId: true, userId: true },
      include: {
        user: {
          omit: {
            image: true,
            bio: true,
          },
        },
      },
    });
    return result;
  };
};
