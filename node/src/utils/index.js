const { scryptSync, descryptSync } = require("node:crypto");
const salt = "czatmachau";

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

//HASHING
function getEncrypedPassword(password) {
	let hash = scryptSync(password, salt, 64, (err, key) => {
		if (err) throw err;
	});
	return hash.toString("Hex");
}

function getDecryptedString(string) {
	let hash = descryptSync(string, salt, 64, (err, key) => {
		if (err) throw err;
	});
	return hash.toString("Hex");
}

module.exports = {
	getRandomInt,
	getEncrypedPassword,
	getDecryptedString,
	salt,
};
