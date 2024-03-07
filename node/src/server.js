//const EventEmitter = require("node:events");
const path = require("node:path");
const pool = require("./config/connection");
const express = require("express");
const LoginController = require("./controllers/LoginController");
const RegisterController = require("./controllers/RegiterController");
const GuestController = require("./controllers/GuestController");
const chat = require("./chat");
const cors = require("cors");

const app = express();
app.use(cors());
console.log(chat);
const serverPort = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//CHAT
chat();

//LOGIN
app.post("/api/login", (req, res) => {
	const loginController = new LoginController(req, res);
	loginController.getUser();
});

//GUEST
app.post("/api/guest", (req, res) => {
	const guestController = new GuestController(req, res);
	guestController.sendGuestName(req, res);
});

//REGISTER
app.post("/api/register", async (req, res) => {
	const registerController = new RegisterController(req, res);

	registerController.addUser(req, res);
});

app.listen(serverPort, () => {
	console.log(`Example app listening on port ${serverPort}`);
});
