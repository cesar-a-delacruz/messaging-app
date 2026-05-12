/**
 * Formats the error message based on the validation type
 * @param {String} type The validation type.
 * @param {String} field The field name.
 * @param {Object?} rules The validation rules or restrictions.
 * @returns {String} formatted error message.
 */
module.exports = function formatValidationError(type, field, rules) {
  switch (type) {
    case "empty":
      return `The ${field} is required`;
    case "length":
      return `The ${field} is to long or too short.${rules ? `\nIt must be in between ${rules.min} and ${rules.max} characters long` : ""}`;
    default:
      return `Invalid ${field}`;
  }
};
