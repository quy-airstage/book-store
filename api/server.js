// const port = process.env.PORT || 3000;

// import { createServer } from 'http';
const http = require("http");
const app = require("./app");
const port = 1210;

const server = http.createServer(app);
server.listen(port);
