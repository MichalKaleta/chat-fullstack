const express = require("express");
const router = express.Router();
const { WebSocketServer } = require("ws");

const verifyToken = require("../middleware/jwtAuthorization");
const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegiterController");
const guestController = require("../controllers/GuestController");
const SearchController = require("../controllers/SearchController");
const FriendController = require("../controllers/FriendController");
const { getRandomInt } = require("../utils/index");

//LOGIN
router.post("/api/login", async (req, res, next) => {
  try {
    const loginController = new LoginController(req, res, next);
    loginController.loginUser();
  } catch (err) {
    next(err);
  }
});

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
  console.log("fd");
  const registerController = new RegisterController(req, res);
  registerController.sendMail();
});
//CHAT

router.get("/api/chat", verifyToken, async (req, res) => {
  res.send({ ok: "ok" });
});

router.post("/api/guest-chat", async (req, res) => {
  const guestName = req.body.guestName;
  const room = `${guestName}-${getRandomInt(10000000)}`;
  await guestController.newSocket(room, guestName);
  res.send({ guestName, room });
});

router.post("/api/guest-chat-join", async (req, res) => {
  const guestName = req.body.guestName;
  res.send({ guestName, room });
});

module.exports = router;
