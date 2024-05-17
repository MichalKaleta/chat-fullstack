const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "smtp.ethereal.email",
	port: 587,
	auth: {
		user: "naomie.rowe@ethereal.email",
		pass: "DAzTMWGnESWYjdUPQF",
	},
});

module.exports = transporter;
