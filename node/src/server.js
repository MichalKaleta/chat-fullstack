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
var privateKey = fs.readFileSync(__dirname + "/cert/selfsigned.key", "utf-8");
var certificate = fs.readFileSync(__dirname + "/cert/selfsigned.crt", "utf-8");

var credentials = { key: privateKey, cert: certificate };

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

global.log = () => null;

if (process.env.ENV === "development") {
  log = (msg) => console.log(`\x1b[33m ${msg}\x1b[0m`);
  app.use(cors());
}

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
/* app.listen(process.env.PORT_APP, () => {
  log(`Listening on port ${process.env.PORT_APP}`);
}); */
//httpServer.listen(3000);
httpsServer.listen(process.env.PORT_APP);
