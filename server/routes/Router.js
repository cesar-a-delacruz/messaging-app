const ExpressRouter = require("express").Router;

module.exports = class Router {
  /**
   * Routes the incomming request to the corresponding controller methods
   * @param {string} basePath  The base name for all paths
   * @param {Controller} controller The Controller that provides all methods to handle requests.
   */
  constructor(basePath, controller) {
    this.basePath = basePath;
    this.controller = controller;
    this.router = ExpressRouter();
  }

  routeREST = (middleware) => {
    this.router.get(
      `${this.basePath}/`,
      middleware ? middleware : this.#emptyMiddleware,
      this.controller.findAll,
    );
    this.router.get(
      `${this.basePath}/:id`,
      middleware ? middleware : this.#emptyMiddleware,
      this.controller.findOne,
    );
    this.router.post(
      `${this.basePath}/`,
      middleware ? middleware : this.#emptyMiddleware,
      this.controller.create,
    );
    this.router.put(
      `${this.basePath}/:id`,
      middleware ? middleware : this.#emptyMiddleware,
      this.controller.update,
    );
    this.router.delete(
      `${this.basePath}/:id`,
      middleware ? middleware : this.#emptyMiddleware,
      this.controller.delete,
    );
    return this;
  };
  route = (method, path, controllerMethod, middleware) => {
    this.router[method](
      `${this.basePath}/${path ? path : ""}`,
      middleware ? middleware : this.#emptyMiddleware,
      this.controller[controllerMethod],
    );
    return this;
  };

  #emptyMiddleware = (req, res, next) => {
    next();
  };
};
