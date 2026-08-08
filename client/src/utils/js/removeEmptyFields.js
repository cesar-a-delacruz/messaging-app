/**
 * Removes empty fields in data objects
 * @param {Object} data
 * @returns {Object}
 */
export default function removeEmptyFields(data) {
  const cleanData = {};
  Object.keys(data).forEach((field) => {
    if (data[field]) cleanData[field] = data[field];
  });
  return cleanData;
}
