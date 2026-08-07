const validationMiddleware = require("../middlewares/validationMiddleware.js");

module.exports = class Controller {
  /**
   * Handles incoming request, validates input values (if any) and returns responses.
   * @param {string} itemName The name of the items it will handle (for response messages).
   * @param {Repository} repository The repository to perform database operations.
   * @param {RunnableValidationChains} validator The validator to validate request data with express-validator.
   */
  constructor(itemName, repository, validator) {
    this.itemName = itemName;
    this.repository = repository;
    if (!validator) validator = { run: (req) => req };
    this.validator = validationMiddleware.bind(null, validator, itemName);
  }
};
