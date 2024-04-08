const db = require("../config/database");

// Function to retrieve user by email
const getUserByEmail = async (email) => {
  const query = `SELECT *
    FROM public."user" where email = $1`;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

// Function to create a new user
const createUser = async (email, password, account_type) => {
  const query = `INSERT INTO "user" ("email", "password", "account_type") 
  VALUES ($1, $2, $3)
   RETURNING *`;
  const user = await db.query(query, [email, password, account_type]);
  return user.rows[0];
};

const getUserById = async (id) => {
  const query = `SELECT id
    FROM public."user" where id = $1`;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const deleteUserById = async (id) => {
  const query = `DELETE FROM public."user"
	WHERE id = $1`;
  await db.query(query, [id]);
};

module.exports = {
  getUserByEmail,
  createUser,
  getUserById,
  deleteUserById,
};
