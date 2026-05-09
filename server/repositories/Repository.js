const parseData = require("../utils/parseData.js");

module.exports = class Repository {
  /**
   * Allows the execution of database operations with a provided Entity
   * @param {Entity} entity The entity that holds both the Prisma model and the schema.
   */
  constructor(entity) {
    this.entity = entity;
  }

  findAll = async () => {
    const result = await this.entity.model.findMany();
    if (result.length === 0) throw new Error("No rows have been found");

    return result;
  };
  findOne = async (id) => {
    const result = await this.entity.model.findUnique({
      where: { id },
    });
    if (!result) throw new Error("This row doesn't exists");

    return result;
  };
  create = async (data) => {
    const result = await this.entity.model.create({
      data: parseData(data, this.entity.schema),
    });
    return result;
  };
  update = async (id, data) => {
    const result = await this.entity.model.update({
      where: { id },
      data: parseData(data, this.entity.schema),
    });
    return result;
  };
  delete = async (id) => {
    const result = await this.entity.model.delete({
      where: { id },
    });
    return result;
  };
};
