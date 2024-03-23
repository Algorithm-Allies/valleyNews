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

const getSubscriptionInfo = async (user_id) => {
  const query = `
    SELECT * FROM subscription WHERE user_id = $1
  `;
  try {
    const result = await db.query(query, [user_id]);
    return result.rows; // Return all rows matching the user_id
  } catch (error) {
    console.error("Error retrieving subscribed user:", error);
    throw error;
  }
};

const editSubscriptionInfo = async (data) => {
  const { user_id, category, frequency, delivery_method } = data;
  try {
    const query = `
      UPDATE subscription
      SET category = $2, frequency = $3, delivery_method = $4
      WHERE user_id = $1
      RETURNING *;
    `;
    const result = await db.query(query, [
      user_id,
      category,
      frequency,
      delivery_method,
    ]);
    return result.rows; // Return the updated subscription row
  } catch (error) {
    console.error("Error editing subscription:", error);
    throw error;
  }
};

const deleteSubscriptionInfo = async (user_id) => {
  try {
    const query = `
      DELETE FROM subscription
      WHERE user_id = $1
      RETURNING *;
    `;
    const result = await db.query(query, [user_id]);
    return result.rows; // Return the deleted subscription row
  } catch (error) {
    console.error("Error deleting subscription:", error);
    throw error;
  }
};

module.exports = {
  subscribeUser,
  getSubscriptionInfo,
  editSubscriptionInfo,
  deleteSubscriptionInfo,
};
