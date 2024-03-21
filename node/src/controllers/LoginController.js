const pool = require("../config/connection");
const { getEncrypedPassword, salt } = require("../utils/index");
const jwt = require("jsonwebtoken");

class LoginController {
	constructor(req, res, next) {
		this.req = req;
		this.res = res;
		this.login = req.body.login;
		this.password = getEncrypedPassword(req.body.password);
		this.next = next;
		this.id = null;
	}

	static getUserData = () => this.id;

	loginUser = async () => {
		try {
			const query = {
				text: "SELECT * FROM users WHERE login = $1 AND password = $2",
				values: [this.login, this.password],
			};
			const dbResponse = await pool.query(query);

			if (!dbResponse.rows[0]) {
				throw new Error("wrong user or password");
			}
			const login = dbResponse.rows[0].login;
			const id = dbResponse.rows[0].id;
			this.id = id;
			//	console.log(this.id, login);

			const token = jwt.sign({ id, login }, salt, {
				expiresIn: "2h",
			});

			this.res.json({ login, token });
		} catch (err) {
			this.next(err);
		}
	};
}

module.exports = LoginController;
