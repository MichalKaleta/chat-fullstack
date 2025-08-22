const { WebSocketServer } = require("ws");
const { v4 } = require("uuid");

let clients = [];
const wsServer = new WebSocketServer({ port: process.env.PORT_WS });

const chat = async (room, guestName) => {
  try {
    const messageListener = (socket) => {
      socket.on("message", (data, isBinary) => {
        const { message = "", guestName, room } = JSON.parse(data);
        const responseData = JSON.stringify({
          message: isBinary ? message : message.toString(),
          id: v4(),
          sender: guestName,
        });
        clients
          .filter((client) => room === client.room)
          .forEach((client) => {
            client.send(responseData);
          });
      });
    };

    wsServer.on("connection", async (socket, req) => {
      /*   const url = new URL(req.url, `http://${req.headers.host}`);
      socket.userName = url.searchParams.get("user"); */
      socket.room = room;
      socket.guestName = guestName;
      clients.push(socket);
      messageListener(socket);
    });
  } catch (err) {
    console.log("ERROR: ", err);
  }
};

module.exports = chat;
