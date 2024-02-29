const path = require("node:path");
const http = require("node:http");
const fs = require("node:fs");
const pool = require("../db/connection");
const EventEmitter = require("node:events");
const express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//GET USERS
app.get("/api/login", async (req, res) => {
	const { login, password } = req.body;
	const query = {
		text: "SELECT * FROM users",
	};
	const dbResponse = await pool.query(query);
	console.log(dbResponse.rows);
	res.json(dbResponse.rows);
});
//LOGIN
app.post("/api/login", async (req, res) => {
	const { login, password } = req.body;
	const query = {
		text: "SELECT 1 FROM users WHERE login = $1 AND password = $2",
		values: [login, password],
	};
	const dbResponse = await pool.query(query);
	res.json(dbResponse.rows);
});

//REGISTER
app.post("/api/register", async (req, res) => {
	const { login, password } = req.body;
	const query = {
		text: "INSERT INTO users(login, password) VALUES($1, $2)",
		values: [login, password],
	};
	const dbResponse = await pool.query(query);

	res.json(dbResponse);
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
