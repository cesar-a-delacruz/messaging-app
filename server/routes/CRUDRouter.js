const Router = require("./Router.js");

module.exports = class CRUDRouter extends Router {
  constructor(basePath, controller, middleware) {
    super(basePath, controller);

    if (middleware) this.middleware = middleware;
    else this.middleware = (req, res, next) => next();

    this.router.get(
      `/${this.basePath}/`,
      this.middleware,
      this.controller.findAll,
    );
    this.router.get(
      `/${this.basePath}/:id`,
      this.middleware,
      this.controller.findOne,
    );
    this.router.post(
      `/${this.basePath}/`,
      this.middleware,
      this.controller.create,
    );
    this.router.put(
      `/${this.basePath}/:id`,
      this.middleware,
      this.controller.update,
    );
    this.router.delete(
      `/${this.basePath}/:id`,
      this.middleware,
      this.controller.delete,
    );
  }
};
