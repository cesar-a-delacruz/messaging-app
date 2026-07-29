const Repository = require("./Repository.js");

module.exports = class ChatMemberRepository extends Repository {
  create = async (data) => {
    const result = await this.entity.model.create({
      data: this.entity.parseData(data),
      select: {
        id: true,
        role: true,
        user: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    });
    return result;
  };
};
