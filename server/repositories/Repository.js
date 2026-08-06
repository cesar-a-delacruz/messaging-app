module.exports = class Repository {
  /**
   * Allows the execution of database operations with a provided Entity.
   * @param {Entity} entity The entity that holds both the Prisma model and the schema.
   */
  constructor(entity) {
    this.entity = entity;
  }

  /**
   * Finds all rows from a model.
   * @returns {Object[]}
   */
  findAll = async () => await this.entity.model.findMany();

  /**
   * Finds one row from a model by id.
   * @param {string} id
   * @returns {Object[]}
   */
  findOne = async (id) =>
    await this.entity.model.findUnique({
      where: { id },
    });

  /**
   * Creates one row in a model with the data provided.
   * @param {Object} data
   * @returns {Object} The created row
   */
  create = async (data) =>
    await this.entity.model.create({
      data: this.entity.parseData(data),
    });

  /**
   * Updates one row in a model with the data provided.
   * @param {string} id
   * @param {Object} data
   * @returns {Object} The updated row
   */
  update = async (id, data) =>
    await this.entity.model.update({
      where: { id },
      data: this.entity.parseData(data),
    });

  /**
   * Deletes one row in a model by id.
   * @param {string} id
   * @returns {Object} The deleted row
   */
  delete = async (id) =>
    await this.entity.model.delete({
      where: { id },
    });
};
