const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/jwtAuthorization");
const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegiterController");
const GuestController = require("../controllers/GuestController");
const SearchController = require("../controllers/SearchController");
const FriendController = require("../controllers/FriendController");
const chat = require("../chat");
///const BaseError = require("../utils/Error");

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
router.post("/api/guest", (req, res) => {
	const guestController = new GuestController(req, res);
	guestController.sendGuestName();
});

//REGISTER
router.post("/api/register", async (req, res) => {
	console.log("fd");
	const registerController = new RegisterController(req, res);
	registerController.sendMail();
});
//CHAT

chat();
router.get("/api/chat", verifyToken, async (req, res) => {
	res.send({ ok: "ok" });
});
module.exports = router;
