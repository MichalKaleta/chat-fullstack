const http = require("node:http");
const crypto = require("crypto");
const querystring = require("node:querystring");
const port = 1337;
const { WebSocketServer } = require("ws");
const url = require("node:url");
const { v4 } = require("uuid");

let clients = [];
const chat = () => {
	const wsServer = new WebSocketServer({ port });

	//INCOMING MESSAGE
	const messageListener = (ws) => {
		ws.on("message", (data, isBinary) => {
			const { message = "", login } = JSON.parse(data);
			const responseData = JSON.stringify({
				message: isBinary ? message : message.toString(),
				id: v4(),
				sender: login,
			});

			clients.forEach((client) => {
				client.send(responseData);
			});
		});
	};

	wsServer.on("connection", (ws, req) => {
		const url = new URL(req.url, `http://${req.headers.host}`);
		ws.userName = url.searchParams.get("user");

		clients.push(ws);
		messageListener(ws);
	});
};
module.exports = chat;
