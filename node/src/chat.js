const { WebSocketServer } = require("ws");
const { v4 } = require("uuid");
//import OpenAI from "openai";
const getDeep = async () => {
	let res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.DEEPSEEK_KEY}`,
			"HTTP-Referer": "http://localhost:3000", // Optional. Site URL for rankings on openrouter.ai.
			"X-Title": "chat michau-michau", // Optional. Site title for rankings on openrouter.ai.
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
	//console.log(res);
	const a = await res.json();
	return a;
};

getDeep()
	.then((res) => console.log("FASDFADF"))
	.catch((err) => console.log("ERROR", err));

let clients = [];
const chat = async () => {
	try {
		console.log("JESTEM");
		const wsServer = new WebSocketServer({ port: process.env.PORT_WS });
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

		wsServer.on("connection", async (ws, req) => {
			const url = new URL(req.url, `http://${req.headers.host}`);
			ws.userName = url.searchParams.get("user");

			clients.push(ws);
			messageListener(ws);
		});
	} catch (err) {}
};
module.exports = chat;
