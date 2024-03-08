const { scryptSync } = require("node:crypto");

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function getEncrypedPassword(password) {
	let hash = scryptSync(password, "czatmachau", 64, (err, key) => {
		if (err) throw err;
	});
	console.log("PASSSSSS", hash.toString("Hex"));
	return hash.toString("Hex");
}

module.exports = { getRandomInt, getEncrypedPassword };
