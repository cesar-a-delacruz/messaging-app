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

  /**
   * Processes the data received to convert from string into the correct type
   * @param {Object} data An object with keys (schema fields) and values in string.
   * @returns {Object}
   */
  parseData(data) {
    const parsedData = {};
    for (const field in data) {
      if (!this.schema.hasOwnProperty(field) && !data[field]) continue;

      switch (this.schema[field]) {
        case "string":
          parsedData[field] = String(data[field]);
          break;
        case "number":
          parsedData[field] = Number(data[field]);
          break;
        case "date":
          parsedData[field] = new Date(data[field]);
          break;
        case "json":
          parsedData[field] = JSON.parse(data[field]);
          break;
      }
    }
    return parsedData;
  }
};
