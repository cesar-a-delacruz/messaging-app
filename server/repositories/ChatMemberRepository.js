const Repository = require("./Repository.js");

module.exports = class ChatMemberRepository extends Repository {
  findAll = async (groupId) =>
    await this.entity.model.findMany({
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
  create = async (members) => {
    members = members.map((member) => this.entity.parseData(member));

    return await this.entity.model.createManyAndReturn({
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
  };
};
