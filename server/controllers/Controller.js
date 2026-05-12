const validationMiddleware = require("../middlewares/validationMiddleware.js");

module.exports = class Controller {
  /**
   * Handles incoming request, validates input values (if any) and return responses
   * @param {Repository} repository The repository to perform database operations.
   * @param {RunnableValidationChains} validator The validator to validate request data with express-validator.
   */
  constructor(repository, validator) {
    this.repository = repository;
    this.validator = validator;
  }

  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll();
      console.table(rows);
      return res
        .status(200)
        .json({ message: "Items found successfully", data: rows })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find items", error })
        .end();
    }
  };
  findOne = async (req, res) => {
    try {
      const row = await this.repository.findOne(req.params.id);
      console.info(row);
      return res
        .status(200)
        .json({ message: "Item found successfully", data: row })
        .end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to find item", error })
        .end();
    }
  };
  create = [
    this.validator,
    validationMiddleware,
    async (req, res) => {
      try {
        const row = await this.repository.create(req.body);
        console.info(row);
        return res
          .status(201)
          .json({ message: "Item created successfully", data: row })
          .end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create item", error })
          .end();
      }
    },
  ];
  update = [
    this.validator,
    validationMiddleware,
    async (req, res) => {
      try {
        const row = await this.repository.update(req.params.id, req.body);
        console.info(row);
        return res.status(204).end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ message: "Failed to create item", error })
          .end();
      }
    },
  ];
  delete = async (req, res) => {
    try {
      const row = await this.repository.delete(req.params.id);
      console.info(row);
      return res.status(204).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Failed to create item", error })
        .end();
    }
  };
};
