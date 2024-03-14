const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateVerificationToken = (user) => {
  const payload = user;
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendVerificationEmail = async (email, verificationToken) => {
  // Construct verification link
  const encodedToken = encodeURIComponent(verificationToken);
  const verificationLink = `http://localhost:8000/api/users/verify?token=${encodedToken}`;

  // Email options
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Email Address",
    html: `Click <a href="${verificationLink}">here</a> to verify your email address.`,
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const storeVerificationToken = async (token) => {
  // Store token in your database along with user ID
  try {
    const query = `INSERT INTO verification_tokens ("token") VALUES ($1);
    `;
    await db.query(query, [token]);
  } catch (error) {
    console.error("Error storing verification token:", error);
    throw error;
  }
};

const getTokenByVerificationToken = async (token) => {
  try {
    const query = `SELECT token FROM public."verification_tokens" WHERE token = $1;`;
    const result = await db.query(query, [token]);
    if (result.rows.length > 0) {
      return result.rows[0].token;
    } else {
      return null; // Token not found
    }
  } catch (error) {
    console.error("Error getting token by verification token:", error);
    throw error;
  }
};

const deleteVerificationToken = async (token) => {
  try {
    const query = `DELETE FROM public."verification_tokens" WHERE token = $1;`;
    await db.query(query, [token]);
  } catch (error) {
    console.error("Error deleting verification token:", error);
    throw error;
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
  return await db.query(query, [
    email,
    password,
    account_type,
    mobile_phone_number,
    business_name,
    business_website,
  ]);
};

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
    const user = {
      email,
      hashedPassword,
      account_type,
      mobile_phone_number,
      business_name,
      business_website,
    };
    const verificationToken = generateVerificationToken(user);

    await storeVerificationToken(verificationToken);

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: "Please verify your email" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifiy = async (req, res) => {
  try {
    const { token } = req.query;
    const decodedToken = decodeURIComponent(token);

    // Get user ID by verification token
    const savedToken = await getTokenByVerificationToken(decodedToken);
    if (!savedToken) {
      return res.redirect("https://example.com/verification-failed");
    }

    const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key
    const decoded = jwt.verify(decodedToken, secretKey);

    await createUser(
      decoded.email,
      decoded.hashedPassword,
      decoded.account_type,
      decoded.mobile_phone_number,
      decoded.business_name,
      decoded.business_website
    );

    await deleteVerificationToken(token);

    res.redirect("https://example.com/verification-success");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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

// Send password reset email
const sendPasswordResetEmail = async (email, token) => {
  const resetLink = `http://localhost:8000/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Password Reset Request",
    text: `To reset your password, please click on the following link: ${resetLink}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Route to request password reset
const passwordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists in the database
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(400).json({ message: "Email doesnt exist" });
    }

    const token = generateVerificationToken({ email });

    // Send password reset email
    await sendPasswordResetEmail(email, token);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Route to handle password reset
const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!newPassword) {
      return res.json({ message: "New Password Required" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    const updateQuery = `UPDATE public."user" SET password = $1 WHERE email = $2`;
    await db.query(updateQuery, [hashedPassword, email]);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
  verifiy,
  resetPassword,
  passwordResetEmail,
};
