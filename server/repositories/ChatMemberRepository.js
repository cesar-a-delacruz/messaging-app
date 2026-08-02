const Repository = require("./Repository.js");

module.exports = class ChatMemberRepository extends Repository {
  findAll = async (groupId) => {
    const result = await this.entity.model.findMany({
      where: {
        chat: {
          is: {
            groupId,
          },
        },
      },
      include: {
        user: {
          omit: {
            image: true,
            bio: true,
          },
        },
      },
    });
    if (result.length === 0) throw new Error("No rows have been found.");

    return result;
  };
  create = async (members) => {
    members = members.map((member) => this.entity.parseData(member));

    const result = await this.entity.model.createManyAndReturn({
      data: members,
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
