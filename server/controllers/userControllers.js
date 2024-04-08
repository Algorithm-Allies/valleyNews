const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  sendPasswordResetEmail,
  sendVerificationEmail,
} = require("../services/emailService");
const {
  generateVerificationToken,
  storeVerificationToken,
  deleteVerificationToken,
  getTokenByVerificationToken,
} = require("../services/tokenService");
const { getUserByEmail, createUser } = require("../services/userService");

const {
  createBusinessQuery,
  userBusinessQuery,
} = require("../services/businessService");

const { createPermissionQuery } = require("../services/permissionService");
// POST /api/users/register
const register = async (req, res) => {
  try {
    const {
      email,
      password,
      account_type,
      phone_number,
      business_name,
      business_website,
    } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }
    if (account_type === "Business") {
      if (!business_name) {
        return res.status(400).json({ message: "Please enter business name" });
      }
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      hashedPassword,
      account_type,
      phone_number,
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

// GET /api/users/verify
const verify = async (req, res) => {
  try {
    const { token } = req.query;
    const decodedToken = decodeURIComponent(token);

    // Get user ID by verification token
    const savedToken = await getTokenByVerificationToken(decodedToken);
    if (!savedToken) {
      return res.redirect("https://example.com/verification-failed");
    }

    const secretKey = process.env.JWT_SECRET;
    const decoded = jwt.verify(decodedToken, secretKey);

    if (decoded.account_type === "Business") {
      await handleBusinessVerification(decoded);
    } else {
      await handleUserVerification(decoded);
    }

    await deleteVerificationToken(token);

    res.redirect("https://example.com/verification-success");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const handleBusinessVerification = async (decoded) => {
  const user = await createUser(
    decoded.email,
    decoded.hashedPassword,
    decoded.account_type
  );

  const user_id = user.id;

  const businessData = {
    phone_number: decoded.phone_number,
    name: decoded.business_name,
    website: decoded.business_website,
  };
  const business = await createBusinessQuery(businessData);

  const permissionData = {
    role: "Admin",
    description: "full access",
  };
  const permission = await createPermissionQuery(permissionData);
  await userBusinessQuery(business.id, user_id, permission.id);
};

const handleUserVerification = async (decoded) => {
  await createUser(decoded.email, decoded.hashedPassword, decoded.account_type);
};

// POST /api/users/login
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
    const isMatch = await bcrypt.compare(password, result.rows[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Login successful", token });
    console.log("Login successful");
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Route to request password reset
// POST /api/users/password-reset-email
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
// POST /api/users/reset-password
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
  verify,
  resetPassword,
  passwordResetEmail,
};
