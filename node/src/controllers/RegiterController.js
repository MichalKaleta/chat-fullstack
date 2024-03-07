const pool = require("../config/connection");

//TODO
class RegisterController {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.login = req.body.login;
		this.password = req.body.password;
	}

	addUser = async () => {
		const query = {
			text: "INSERT INTO users(login, password) VALUES($1, $2)",
			values: [this.login, this.password],
		};
		const dbResponse = await pool.query(query);

		res.json(dbResponse);
	};
}

module.exports = RegisterController;
