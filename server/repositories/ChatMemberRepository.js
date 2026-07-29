const parseData = require("../utils/parseData.js");
const Repository = require("./Repository.js");

module.exports = class ChatMemberRepository extends Repository {
  create = async (data) => {
    const result = await this.entity.model.create({
      data: parseData(data, this.entity.schema),
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
