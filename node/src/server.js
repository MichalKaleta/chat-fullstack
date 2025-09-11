const path = require("node:path");
const pool = require("./config/connection");
const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const verifyToken = require("./middleware/jwtAuthorization");
const app = express();
const errorHandler = (err, req, res, next) => {
  console.log(`\x1b[33m ${JSON.stringify(err)}\x1b[0m`);
  console.log(`\x1b[33m ${err}\x1b[0m`);
  res.status(401).send(err.message);
};
var fs = require("fs");
var http = require("http");
var https = require("https");
var privateKey = fs.readFileSync(__dirname + "/cert/selfsigned.key", "utf-8");
var certificate = fs.readFileSync(__dirname + "/cert/selfsigned.crt", "utf-8");

var credentials = { key: privateKey, cert: certificate };

console.log("I am running in " + process.env.NODE_ENV + " mode");

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api", router);

app.use(errorHandler);

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.ENV === "production" ||
  Boolean(process.env.VERCEL);

if (isProduction) {
    console.log("production", process.env.PORT);
    app.use("/", express.static(path.join(__dirname, "../../front", "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../front", "dist", "index.html"));
    });
}

const PORT = process.env.PORT || process.env.PORT_APP || 3000;

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}


module.exports = app;