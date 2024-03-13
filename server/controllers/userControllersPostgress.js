const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST /api/users/register
const register = async (req, res) => {
  try {
    // Extract user input from request body
    const {
      email,
      password,
      account_type,
      mobile_phone_number,
      business_name,
      business_website,
    } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await createUser(
      email,
      hashedPassword,
      account_type,
      mobile_phone_number,
      business_name,
      business_website
    );

    // Respond with success message
    res.status(201).json({ message: "Account registered" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to retrieve user by email
const getUserByEmail = async (email) => {
  const query = `SELECT email
  FROM public."user" where email = $1`;
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

// Function to create a new user
const createUser = async (
  email,
  password,
  account_type,
  mobile_phone_number,
  business_name,
  business_website
) => {
  const query = `INSERT INTO "user" ("email", "password", "account_type", "mobile_phone_number", "business_name", "business_website") VALUES ($1, $2, $3, $4, $5, $6)`;
  await db.query(query, [
    email,
    password,
    account_type,
    mobile_phone_number,
    business_name,
    business_website,
  ]);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }

    const query = `SELECT email, password, id
    FROM public."user" where email = $1`;
    const result = await db.query(query, [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //       // Generate a token
    const user = result.rows[0];

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    //       // Send the token in a HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
