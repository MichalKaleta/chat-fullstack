const pool = require("../config/connection");
const { getEncrypedPassword } = require("../utils/index");

//TODO
class SearchController {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.query = req.query.searchUser;
	}

	getUsers = async () => {
		console.log(this.query);
		const query = {
			text: "SELECT login, id FROM users WHERE login LIKE $1",
			values: [this.query],
		};
		const dbResponse = await pool.query(query);

		this.res.json(dbResponse.rows);
	};
}

module.exports = SearchController;
