const jwt = require("jsonwebtoken");
const { salt } = require("../utils/index");

function verifyToken(req, res, next) {
	console.log(next);
	const token = req.header("Authorization");
	if (!token) return res.status(401).json({ error: "Access denied" });
	try {
		console.log(next);
		const decoded = jwt.verify(token, salt);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		res.status(401).json({ error: "Invalid token" });
	}
}

module.exports = verifyToken;
