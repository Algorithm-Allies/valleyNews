const db = require("../config/database");

const subscribeUser = async (data) => {
  const { user_id, category, frequency, delivery_method } = data;
  const query = `
      INSERT INTO subscription ("user_id", "category", "frequency", "delivery_method")
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

  try {
    const result = await db.query(query, [
      user_id,
      category,
      frequency,
      delivery_method,
    ]);
    return result.rows[0]; // Return the inserted subscription row, if needed
  } catch (error) {
    console.error("Error subscribing user:", error);
    throw error;
  }
};

module.exports = {
  subscribeUser,
};
