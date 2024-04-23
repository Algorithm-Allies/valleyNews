const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const db = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
  require: true,
  rejectUnauthorized: false,
  },
});

module.exports = db;
