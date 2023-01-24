const express = require("express");
const app = express();
const logger = require("morgan");
const bodyParser = require("body-parser");

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./server/routes")(app);
app.get("/*", (request, response) =>
  response.status(200).send({
    msg: "* route",
  })
);

module.exports = app;
