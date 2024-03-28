const db = require("../config/database");

const createBusinessQuery = async (businessData) => {
  try {
    const query = `
    INSERT INTO business ("admin_id", "phone_number", "name", "website")
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;

    const { admin_id, phone_number, name, website } = businessData;
    const business = await db.query(query, [
      admin_id,
      phone_number,
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
    const { phone_number, business_name, business_website } = newData;
    const query = `
        UPDATE business
        SET phone_number = $1, name = $2, website = $3
        WHERE id = $4
        RETURNING *;
      `;
    const result = await db.query(query, [
      phone_number,
      business_name,
      business_website,
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

const addUserQuery = async (businessId, userId) => {
  try {
    const query = `
        UPDATE business
        SET user_ids = array_append(user_ids, $2)
        WHERE id = $1;
      `;
    const result = await db.query(query, [businessId, userId]);
    return result.rows;
  } catch (error) {
    console.error("Error adding user to business:", error);
    throw error;
  }
};

const removeUserQuery = async (businessId, userId) => {
  try {
    const query = `
        UPDATE business
        SET user_ids = array_remove(user_ids, $2)
        WHERE id = $1;
      `;
    const result = await db.query(query, [businessId, userId]);
    return result.rows;
  } catch (error) {
    console.error("Error removing user from business:", error);
    throw error;
  }
};

const addArticleQuery = async (businessId, articleId) => {
  try {
    const query = `
        UPDATE business
        SET article_ids = array_append(article_ids, $2)
        WHERE id = $1;
      `;
    const result = await db.query(query, [businessId, articleId]);
    return result.rows;
  } catch (error) {
    console.error("Error adding article to business:", error);
    throw error;
  }
};

const removeArticleQuery = async (businessId, articleId) => {
  try {
    const query = `
        UPDATE business
        SET article_ids = array_remove(article_ids, $2)
        WHERE id = $1;
      `;
    const result = await db.query(query, [businessId, articleId]);
    return result.rows;
  } catch (error) {
    console.error("Error removing article from business:", error);
    throw error;
  }
};

module.exports = {
  createBusinessQuery,
  viewBusinessQuery,
  deleteBusinessQuery,
  editBusinessQuery,
  addUserQuery,
  removeUserQuery,
  addArticleQuery,
  removeArticleQuery,
};
