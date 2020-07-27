const { createServer } = require("hhtp");
const next = require("next");

const app = next({
    dev: process.env.NODE_ENV !== "production"
});

const routes = require("./routes");
const handler = routes.getRequesHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, (err) => {
        if(err) throw err;
        console.log("Server ready on localhost:3000");
    });
});