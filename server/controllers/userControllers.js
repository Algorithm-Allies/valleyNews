const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/users/register
const register = async (req, res) => {
  const {
    email, // Required
    password, // Required
    account_type, // Required
    mobile_phone_number,
    business_name,
    business_website,
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }

  // Check if the user already exists
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) throw err;
      if (result[0]) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into the database
      db.query(
        "INSERT INTO users (email, password, account_type, mobile_phone_number, business_name, business_website) VALUES (?, ?, ?, ?, ?, ?)",
        [
          email,
          hashedPassword,
          account_type,
          mobile_phone_number,
          business_name,
          business_website,
        ],
        (err, result) => {
          if (err) throw err;
          res.status(201).json({ message: "Account registered" });
        }
      );
    }
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }

  // Check if the user exists
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) throw err;
      if (!result[0]) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const user = result[0];

      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, result[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate a token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "3h",
        }
      );

      // Send the token in a HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
      });
      res.status(200).json({ message: "Login successful", token });
    }
  );
};

module.exports = { register, login };
