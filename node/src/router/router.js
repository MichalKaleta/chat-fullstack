const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegiterController");
const GuestController = require("../controllers/GuestController");
///const BaseError = require("../utils/Error");

//LOGIN
router.post("/api/login", async (req, res, next) => {
	try {
		const loginController = new LoginController(req, res, next);
		loginController.getUser();
	} catch (err) {
		next(err);
	}
});

//GUEST
router.post("/api/guest", (req, res) => {
	const guestController = new GuestController(req, res);
	guestController.sendGuestName();
});

//REGISTER
router.post("/api/register", async (req, res) => {
	const registerController = new RegisterController(req, res);
	registerController.addUser();
});

module.exports = router;
