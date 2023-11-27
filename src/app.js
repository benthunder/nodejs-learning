const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const nunjucks = require('nunjucks');


const path = require('path');
const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
require("./dbs/mogodb.db");

nunjucks.configure(path.join(__dirname, 'public/view'), {
    autoescape: true,
    express: app
}).addGlobal("host_url", process.env.HOST_URL);

app.use('/read', express.static(path.join(__dirname, 'storages')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use("/", require("./routes"));

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    return res.status(status).json({
        status: "error",
        code: status,
        message: error.message || "Interal error",
    });
});

module.exports = app;