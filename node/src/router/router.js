const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/jwtAuthorization");
const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegiterController");
const GuestController = require("../controllers/GuestController");
const SearchController = require("../controllers/SearchController");
const FriendController = require("../controllers/FriendController");
const chatWithAi = require("../chat");
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

chatWithAi();
router.get("/api/chat", verifyToken, async (req, res) => {
	res.send({ ok: "ok" });
});

router.get("/deep", async (req, res) => {});

/* const getDeep = async () => {
	let res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.DEEPSEEK_KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			model: "deepseek/deepseek-r1:free",
			messages: [{ role: "user", content: "What is the meaning of life?" }],
			top_p: 1,
			temperature: 0.685116487331014,
			repetition_penalty: 1,
		}),
	});
	console.log(res);
	if (res.ok) {
		console.log("OK", res);
		return res;
	}
};

getDeep()
	.then((res) => {
		console.log(res);
		console.log("fdfdf");
	})
	.catch((err) => console.log("ERROR", err));
 */
module.exports = router;
