const pool = require("../config/connection");
const { getEncrypedPassword } = require("../utils/index");

class LoginController {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.login = req.body.login;
		this.password = getEncrypedPassword(req.body.password);
	}

	getUser = async () => {
		const query = {
			text: "SELECT login, password FROM users WHERE login = $1 AND password = $2",
			values: [this.login, this.password],
		};
		const dbResponse = await pool.query(query);
		this.res.json({ login: dbResponse.rows[0].login });
	};
}

module.exports = LoginController;
