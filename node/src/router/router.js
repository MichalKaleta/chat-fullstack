const express = require("express");
const { v4 } = require("uuid");
const { WebSocketServer } = require("ws");
const verifyToken = require("../middleware/jwtAuthorization");
const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegiterController");
const guestController = require("../controllers/GuestController");
const SearchController = require("../controllers/SearchController");
const FriendController = require("../controllers/FriendController");
const { getRandomInt } = require("../utils/index");
const path = require("node:path");

const router = express.Router();
//LOGIN
router.post("/api/login", async (req, res, next) => {
  try {
    const loginController = new LoginController(req, res, next);
    loginController.loginUser();
  } catch (err) {
    next(err);
  }
});
/* router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist"));
}); */
//ADD FRIEND
router.post("/api/addFriend", (req, res) => {
  const friendController = new FriendController(req, res);
  friendController.addFriend();
});

//SEARCH
router.get("/api/search", (req, res) => {
  const searchController = new SearchController(req, res);
  searchController.getUsers();
});

//GUEST
router.post("/api/guest", guestController.sendGuestName);

//REGISTER
router.post("/api/register", async (req, res) => {
  const registerController = new RegisterController(req, res);
  registerController.sendMail();
});
//CHAT

const rooms = {};
const wsServer = new WebSocketServer();
connetionsCount = 0;

wsServer.on("connection", async (socket, req) => {
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

router.get("/api/chat", verifyToken, async (req, res) => {
  res.send({ ok: "ok" });
});

router.post("/guest-chat", async (req, res) => {
  const guestName = req.body.guestName;
  const room = `${guestName}-${getRandomInt(10000000000)}`;
  res.send({ guestName, room });
});

router.post("/api/guest-chat-join", async (req, res) => {
  const { guestName, room } = req.body;
  res.send({ guestName, room });
});

module.exports = router;
