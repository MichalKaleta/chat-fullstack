const path = require("node:path");
const pool = require("./config/connection");
const express = require("express");
const chat = require("./chat");
const cors = require("cors");
const router = require("./router/router");
const BaseError = require("./utils/BaseError");
//const { log } = require("node:console");

const app = express();

global.log = () => null;

if (process.env.ENV === "devlopment") {
	log = (msg) => console.log(`\x1b[33m ${msg}\x1b[0m`);
	app.use(cors());
}

const errorHandler = (err, req, res, next) => {
	//log(typeof err);
	log("POTĘŻNYERROR HANDLER:");
	log(JSON.stringify(err));
	res.status(401).send(err.message);
};

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

chat();
app.use(router);
app.use(errorHandler);
app.listen(process.env.PORT_APP, () => {
	console.log(`Listening on port ${process.env.PORT_APP}`);
});
