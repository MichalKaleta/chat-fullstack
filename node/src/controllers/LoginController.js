const pool = require("../config/connection");

class LoginController {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.login = req.body.login;
		this.password = req.body.password;
	}

	getUser = async () => {
		const query = {
			text: "SELECT login, password FROM users WHERE login = $1 AND password = $2",
			values: [this.login, this.password],
		};

		const dbResponse = await pool.query(query);
		console.log(dbResponse.rows[0]);
		this.res.json(dbResponse.rows[0]);
	};
}

module.exports = LoginController;
