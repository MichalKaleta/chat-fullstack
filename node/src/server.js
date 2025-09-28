const path = require("node:path");
const pool = require("./config/connection");
const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const verifyToken = require("./middleware/jwtAuthorization");
const app = express();
const errorHandler = (err, req, res, next) => {
  log(JSON.stringify(err));
  log(err);
  res.status(401).send(err.message);
};
var fs = require("fs");
var http = require("http");
var https = require("https");

// your express configuration here

global.log = () => null;

app.use("/", express.static(path.join(__dirname, "../dist")));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(["/api"], router);

app.get("*", (req, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.use(errorHandler);
if (process.env.ENV === "development") {
  var httpServer = http.createServer(app);
  log = (msg) => console.log(`\x1b[33m ${msg}\x1b[0m`);
  app.use(cors());

  var httpsServer = https.createServer(credentials, app);
  z;
  httpServer.listen(3000);
} else {
  /* app.listen(process.env.PORT_APP, () => {
  log(`Listening on port ${process.env.PORT_APP}`);
}); */
  app.listen(process.env.PORT_APP);
}
