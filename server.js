const express = require("express")();
const next = require("next");

const app = next({
    dev: process.env.NODE_ENV !== "production"
});

const routes = require("./routes");
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    const server = express.use(handler);

    server.listen(3000, (err) => {
        if(err) throw err;
        console.log("Server ready on localhost:3000");
    });
});



