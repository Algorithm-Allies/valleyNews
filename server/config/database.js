const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })
  .promise();

async function fetchAndLogCars() {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    console.log(rows);
  } catch (error) {
    console.error("Error retrieving data:", error);
  } finally {
    pool.end(); // Close the pool when done
  }
}

fetchAndLogCars();

module.exports = db;
