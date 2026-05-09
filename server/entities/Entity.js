module.exports = class Entity {
  /**
   * Keeps information about a Prisma model and its schema types
   * @param {PrismaModel} model The model declared in schema.prisma accesed through a PrismaClient.
   * @param {Object} schema An object with the model's field names as keys and types (in strings) as the values.
   */
  constructor(model, schema) {
    this.model = model;
    this.schema = schema;
  }
};
