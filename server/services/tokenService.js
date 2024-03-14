const jwt = require("jsonwebtoken");

const generateVerificationToken = (user) => {
  const payload = user;
  const secretKey = process.env.JWT_SECRET;
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secretKey, options);
  return token;
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

module.exports = {
  generateVerificationToken,
  storeVerificationToken,
  deleteVerificationToken,
  getTokenByVerificationToken,
};
