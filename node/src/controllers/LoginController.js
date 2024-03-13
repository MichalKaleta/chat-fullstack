const pool = require("../config/connection");
const { getEncrypedPassword } = require("../utils/index");
const BaseError = require("../utils/BaseError");

class LoginController {
	constructor(req, res, next) {
		this.req = req;
		this.res = res;
		this.login = req.body.login;
		this.password = getEncrypedPassword(req.body.password);
		this.next = next;
	}

	getUser = async () => {
		try {
			const query = {
				text: "SELECT login, password FROM users WHERE login = $1 AND password = $2",
				values: [this.login, this.password],
			};
			const dbResponse = await pool.query(query);

			if (!dbResponse.rows[0]) {
				throw new Error("wrong user or password");
			}
			const login = dbResponse.rows[0].login;
			this.res.json({ login });
		} catch (err) {
			this.next(err);
		}
	};
}

module.exports = LoginController;
