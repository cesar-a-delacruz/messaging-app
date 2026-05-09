/**
 * Processes the data received to convert from string into the right type
 * @param {Object} data An object with keys (schema fields) and values in string.
 * @param {Entity.schema} schema An Entity's schema to obtain the type for the data's values convertion.
 * @returns {Object}
 */
module.exports = function (data, schema) {
  let parsedData = {};
  for (const field in data) {
    if (schema.hasOwnProperty(field) && data[field]) {
      switch (schema[field]) {
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
        default:
          parsedData[field] = null;
          break;
      }
    }
  }
  return parsedData;
};
