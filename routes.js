const routes = require("next-routes")();

routes
    .add("/insurance/new", "/insurance/new")
    .add("/insurance/:address", "/insurance/show")
    .add("/insurance/:address/claims", "/insurance/claims/index")
    .add("/insurance/:address/claims/new", "/insurance/claims/new")
    .add("/insurance/:address/claims/:id/claimAnalysis", "/insurance/claims/claimAnalysis");

module.exports = routes;