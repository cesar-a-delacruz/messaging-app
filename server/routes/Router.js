const ExpressRouter = require("express").Router;

module.exports = class Router {
  /**
   * Routes the incomming request to the corresponding controller methods.
   * @param {string} basePath  The base name for all paths.
   * @param {Controller} controller The Controller that provides all methods to handle requests.
   */
  constructor(basePath, controller) {
    this.basePath = basePath;
    this.controller = controller;
    this.router = ExpressRouter();
  }

  route = (routerMethod, controllerMethod, path, middleware) => {
    if (!path) path = "";
    if (!middleware) middleware = (req, res, next) => next();

    this.router[routerMethod](
      `/${this.basePath}/${path}`,
      middleware,
      this.controller[controllerMethod],
    );
    return this;
  };
};
