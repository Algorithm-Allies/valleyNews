const db = require("../config/database");

const createBusinessQuery = async (businessData) => {
  try {
    const query = `
    INSERT INTO business ("admin_id", "address", "phone_number", "email", "name", "website")
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`;

    const { admin_id, address, phone_number, email, name, website } =
      businessData;
    const business = await db.query(query, [
      admin_id,
      address,
      phone_number,
      email,
      name,
      website,
    ]);
    return business.rows[0];
  } catch (error) {
    console.error("Error adding creating business", error);
    throw error;
  }
};
const viewBusinessQuery = async (businessId) => {
  try {
    const query = `
        SELECT * FROM business
        WHERE id = $1;
      `;
    const result = await db.query(query, [businessId]);
    return result.rows[0]; // Assuming businessId is unique and returns only one row
  } catch (error) {
    console.error("Error retrieving business:", error);
    throw error;
  }
};

const editBusinessQuery = async (businessId, newData) => {
  try {
    const { address, phoneNumber, email, name, website } = newData;
    const query = `
        UPDATE business
        SET address = $1, phone_number = $2, email = $3, name = $4, website = $5
        WHERE id = $6
        RETURNING *;
      `;
    const result = await db.query(query, [
      address,
      phoneNumber,
      email,
      name,
      website,
      businessId,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error editing business:", error);
    throw error;
  }
};

const deleteBusinessQuery = async (businessId) => {
  try {
    const query = `
        DELETE FROM business
        WHERE id = $1
        RETURNING *;
      `;
    const result = await db.query(query, [businessId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting business:", error);
    throw error;
  }
};

module.exports = {
  createBusinessQuery,
  viewBusinessQuery,
  deleteBusinessQuery,
  editBusinessQuery,
};
