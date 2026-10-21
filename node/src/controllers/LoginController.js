const pool = require("../config/connection");
const { getEncrypedPassword, salt } = require("../utils/index");
const jwt = require("jsonwebtoken");

class LoginController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.email = req.body.email;
    this.password = getEncrypedPassword(req.body.password);
    this.next = next;
    this.id = null;
  }

  static getUserData = () => this.id;

  loginUser = async () => {
    console.log("email:  ", this.email, "  pass:  ", this.password);
    try {
      const query = {
        text: "SELECT * FROM users WHERE email = $1 AND password = $2",
        values: [this.email, this.password],
      };
      const dbResponse = await pool.query(query);

      if (!dbResponse.rows[0]) {
        throw new Error("wrong user or password");
      }
      const email = dbResponse.rows[0].email;
      const id = dbResponse.rows[0].id;
      this.id = id;
      //	console.log(this.id, login);

      const token = jwt.sign({ id, email }, salt, {
        expiresIn: "2h",
      });

      this.res.json({ email, token });
    } catch (error) {
      console.log(error);
      this.res.json({ error });
    }
  };
}

module.exports = LoginController;
