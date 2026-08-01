const Repository = require("./Repository.js");

module.exports = class ChatMemberRepository extends Repository {
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
