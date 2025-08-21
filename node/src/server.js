const path = require("node:path");
const pool = require("./config/connection");
const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const verifyToken = require("./middleware/jwtAuthorization");

const app = express();

global.log = () => null;

if (process.env.ENV === "development") {
  log = (msg) => console.log(`\x1b[33m ${msg}\x1b[0m`);
  app.use(cors());
  console.log("d");
}

const errorHandler = (err, req, res, next) => {
  //log(typeof err);

  log(JSON.stringify(err));
  log(err);
  res.status(401).send(err.message);
};

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(router);
app.use(errorHandler);
app.listen(process.env.PORT_APP, () => {
  log(`Listening on port ${process.env.PORT_APP}`);
});
