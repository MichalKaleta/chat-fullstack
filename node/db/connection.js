const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	database: "postgres",
	password: "example",
	port: 5423,
	min: 0,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 20000,
});

module.exports = pool;
