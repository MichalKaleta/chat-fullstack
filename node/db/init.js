import pool from "../src/config/connection";

export async function initUsersTable() {
  return await pool.query({
    text: `CREATE TABLE IF NOT EXISTS users (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      login VARCHAR (50) UNIQUE,
      password VARCHAR (255) NOT NULL,
      email VARCHAR (255) UNIQUE NOT NULL
  )`,
  });
}
