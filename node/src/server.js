const path = require("node:path");
const pool = require("./config/connection");
const express = require("express");
const cors = require("cors");
const router = require("./router/router");
const verifyToken = require("./middleware/jwtAuthorization");
const { WebSocketServer } = require("ws");
const { v4 } = require("uuid");
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
const PORT = process.env.PORT || process.env.PORT_APP || 3000;

console.log("I am running in " + process.env.NODE_ENV + " mode");

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api", router);
//const wsServer = new WebSocketServer({ port: process.env.PORT_WS  });
 
const server = http.createServer(app);    

const wsServer = new WebSocketServer({ path: '/ws',server });  ; 

console.log("WebSocket server: " + JSON.stringify(wsServer))
const rooms = {};
//const wsServer = new WebSocketServer({ port: process.env.PORT_WS });
let connetionsCount = 1000;

console.log("WebSocket server: " + JSON.stringify(wsServer.address()))

wsServer.on("connection", async (socket, req) => {  
  console.log("New connection established");
  const len = req.url.length;
  const url = new URL("https://www.placeholder.com" + req.url.slice(1, len));
  const room = url.searchParams.get("room");

  if (!rooms[room]) {
    rooms[room] = [];
  }
  rooms[room].push(socket);

  console.table(rooms);

  socket.on("message", (data, isBinary) => {
    const { message = "", guestName, room } = JSON.parse(data);

    console.log("Received message:", message, "from guest:", guestName, "in room:", room);
    const responseData = JSON.stringify({
      message: isBinary ? message : message.toString(), 
      id: v4(),
      sender: guestName,
    });

    rooms[room]?.forEach((socket, i) => {
      socket.send(responseData);
    });
  });
});


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



if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}


module.exports = app;