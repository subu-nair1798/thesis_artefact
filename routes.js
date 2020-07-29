const routes = require("next-routes")();

routes
    .add("/insurance/new", "/insurance/new")
    .add("/insurance/:address", "/insurance/show");

module.exports = routes;