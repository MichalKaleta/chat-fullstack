const { WebSocketServer } = require("ws");
const { v4 } = require("uuid");
const OpenAI = require("openai");

const openAi = new OpenAI({
	apiKey: process.env.GEMINI,
	baseURL: "https://openrouter.ai/api/v1",
});
async function sendMsg(content) {
	const res = await openAi.chat.completions.create({
		messages: [{ role: "user", content  }],
		model: "google/gemini-2.0-flash-lite-preview-02-05:free",
	});
	console.log("res:");
	return console.log(res.choices[0].message.content);
}
main();
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
const chatWithAi = async () => {
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
module.exports = chatWithAi;
