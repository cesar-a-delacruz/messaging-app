const Repository = require("./Repository.js");

module.exports = class UserRepository extends Repository {
  findAll = async (userId) => {
    const result = await this.entity.model.findMany({
      where: { NOT: { id: userId } },
    });
    if (!result.length) throw new Error("No matching rows were found");

    return result;
  };
};
