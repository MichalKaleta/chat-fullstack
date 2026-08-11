const express = require("express");
const http = require("http");
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
console.log("router.js loaded");

//LOGIN

//CHAT



router.post("/login", async (req, res, next) => {
  try {
    const loginController = new LoginController(req, res, next);
    loginController.loginUser();
  } catch (err) {
    next(err);
  }
});

//ADD FRIEND
router.post("/addFriend", (req, res) => {
  const friendController = new FriendController(req, res);
  friendController.addFriend();
});

//SEARCH
router.get("/search", (req, res) => {
  const searchController = new SearchController(req, res);
  searchController.getUsers();
});

//GUEST
router.post("/guest", guestController.sendGuestName);

//REGISTER
router.post("/register", async (req, res) => {
  const registerController = new RegisterController(req, res);
  registerController.sendMail();
});

router.get("/chat", verifyToken, async (req, res) => {
  res.send({ ok: "ok" });
});

router.post("/guest-chat", async (req, res) => {
  console.log("guest-chat", req.body);
  const guestName = req.body.guestName;
  const room = `${guestName}-${getRandomInt(10000000000)}`;
  res.send({ guestName, room });
});

router.post("/guest-chat-join", async (req, res) => {
  const { guestName, room } = req.body;
  res.send({ guestName, room });
});

module.exports = router;
