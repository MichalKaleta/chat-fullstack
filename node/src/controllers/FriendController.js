const pool = require("../config/connection");
const { getEncrypedPassword } = require("../utils/index");
const BaseError = require("../utils/BaseError");
const LoginController = require("./LoginController");

class FriendController {
	constructor(req, res, next) {
		this.req = req;
		this.res = res;
		this.friendId = req.body.id;
		//	this.next = next;
		this.loggedUser = LoginController.getUserData();
	}

	addFriend = async () => {
		console.log(this.loggedUser, "     ", this.friendId);

		try {
			const query = {
				text: "INSERT INTO users friends VALUES $2 WHERE id = $1",
				values: [this.loggedUser, this.friendId],
			};
			const dbResponse = await pool.query(query);
			//console.log(dbResponse);
			//const res = dbResponse.rows[0];
			this.res.json({ res });
		} catch (err) {
			throw err;
		}
	};
}

module.exports = FriendController;
