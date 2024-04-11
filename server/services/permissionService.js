const db = require("../config/database");

const createPermissionQuery = async (permissionData) => {
  try {
    const { role, description } = permissionData;

    const query = `
      INSERT INTO permissions ("role", "description")
      VALUES ($1, $2)
      RETURNING *;
    `;

    const { rows } = await db.query(query, [role, description]);

    return rows[0];
  } catch (error) {
    console.error("Error creating permission:", error);
    throw error;
  }
};

module.exports = {
  createPermissionQuery,
};
