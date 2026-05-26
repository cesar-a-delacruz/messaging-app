const Router = require("./Router.js");
const controllers = require("../controllers/index.js");

module.exports = {
  user: new Router("user", controllers.user).routeREST(),
  message: new Router("message", controllers.message)
    .routeREST()
    .route("get", "latest/:userId", "findLatest")
    .route("get", "sender/:senderId/receiver/:receiverId", "findChat"),
  group: new Router("group", controllers.group).routeREST(),
  groupMember: new Router("groupMember", controllers.groupMember).routeREST(),
};
