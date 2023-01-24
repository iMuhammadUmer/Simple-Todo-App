const http = require("http");
const app = require("../app");

require('dotenv').config();
const {HOST, PORT} = process.env;

const port = parseInt(process.env.PORT, 10) || 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port,process.env.HOST);
