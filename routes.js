const routes = require("next-routes")();

routes
    .add("/insurance/new", "/insurance/new")
    .add("/insurance/:address", "/insurance/show")
    .add("/insurance/:address/claims/", "/insurance/claims/index");

module.exports = routes;