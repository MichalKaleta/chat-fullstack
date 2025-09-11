const pool = require("../config/connection");
const { getRandomInt } = require("../utils/index");

class GuestController {
  sendGuestName = async (req, res, next) => {
    const guestName = `${req.body.guestName}-${getRandomInt(10000000)}`;
    res.json({ guestName });
  };

  joinGuestChat = async (req, res, next) => {
    res.json({ guestName });
  };
}

const guestController = new GuestController();
module.exports = guestController;
