const pool = require("../config/connection");
const { getEncrypedPassword } = require("../utils/index");

//TODO
class RegisterController {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.login = req.body.login;

		this.hashPassword = getEncrypedPassword(req.body.password);
	}

	addUser = async () => {
		const query = {
			text: "INSERT INTO users(login, password) VALUES($1, $2)",
			values: [this.login, this.hashPassword],
		};
		const dbResponse = await pool.query(query);

		this.res.json(dbResponse);
	};
}

module.exports = RegisterController;
