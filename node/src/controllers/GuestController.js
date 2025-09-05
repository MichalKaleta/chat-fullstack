const pool = require("../config/connection");
const { getRandomInt } = require("../utils/index");
const { WebSocketServer } = require("ws");
const { v4 } = require("uuid");
const wsServer = require("../router/router");
class GuestController {
  rooms = {};
  wsServer = new WebSocketServer({ port: process.env.PORT_WS });

  sendGuestName = async (req, res, next) => {
    const guestName = `${req.body.guestName}-${getRandomInt(10000000)}`;
    res.json({ guestName });
  };

  joinGuestChat = async (req, res, next) => {
    res.json({ guestName });
  };

  messageListener = (socket) => {
    socket.on("message", (data, isBinary) => {
      const { message = "", guestName, room } = JSON.parse(data);
      const responseData = JSON.stringify({
        message: isBinary ? message : message.toString(),
        id: v4(),
        sender: guestName,
      });

      this.rooms[room]?.forEach((socket, i) => {
        console.log(i);
        socket.send(responseData);
      });
    });
  };

  newSocket = async (room, guestName) => {
    this.wsServer.on("connection", async (socket, req) => {
      socket.name = guestName;
      socket.room = room;
      if (!this.rooms[room]) {
        this.rooms[room] = [];
      }
      console.log("////////////");
      console.table(this.rooms);
      console.log("////////////");
      //clients.push(socket);
      this.rooms[room].push(socket);

      this.messageListener(socket);
    });
  };
}
const guestController = new GuestController();
module.exports = guestController;
