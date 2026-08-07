const Controller = require("./Controller.js");

module.exports = class CRUDController extends Controller {
  findAll = async (req, res) => {
    try {
      const rows = await this.repository.findAll();

      if (!rows.length)
        return res
          .status(404)
          .json({ error: `No ${this.itemName} have been found.` })
          .end();

      console.table(rows);
      return res.status(200).json({ data: rows }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find any ${this.itemName}.` })
        .end();
    }
  };
  findOne = async (req, res) => {
    try {
      const row = await this.repository.findOne(req.params.id);

      if (!row)
        return res
          .status(404)
          .json({ error: `This ${this.itemName} doesn't exists.`, data: row })
          .end();

      console.info(row);
      return res.status(200).json({ data: row }).end();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: `Failed to find ${this.itemName}.` })
        .end();
    }
  };
  create = [
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        const row = await this.repository.create(req.body);
        console.info(row);
        return res.status(201).json({ data: row }).end();
      } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: `Failed to create ${this.itemName}.` })
          .end();
      }
    },
  ];
  update = [
    async (req, res, next) => await this.validator(req, res, next),
    async (req, res) => {
      try {
        const row = await this.repository.update(req.params.id, req.body);
        console.info(row);
        return res.status(204).end();
      } catch (error) {
        console.error(error);

        if (error.code === "P2025")
          return res
            .status(400)
            .json({ error: `Can't find ${this.itemName} to update.` })
            .end();

        return res
          .status(500)
          .json({ error: `Failed to update ${this.itemName}.` })
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

      if (error.code === "P2025")
        return res
          .status(400)
          .json({ error: `Can't find ${this.itemName} to delete.` })
          .end();

      return res
        .status(500)
        .json({ error: `Failed to delete ${this.itemName}.` })
        .end();
    }
  };
};
