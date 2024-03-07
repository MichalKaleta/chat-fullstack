const pool = require("../config/connection");
const getRandomInt = require("../utils/index");

class GuestController {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		this.guestName = `${req.body.guestName}${getRandomInt(10000000)}`;
	}

	sendGuestName = async () => {
		this.res.json({ guestName: this.guestName });
	};
}

module.exports = GuestController;
