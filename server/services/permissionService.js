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
const updatePermissionQuery = async (permissionData) => {
  try {
    const { userId, businessId, role, description } = permissionData;

    const updatePermissionQuery = `
    UPDATE permissions AS p
    SET role = $1, description = $2
    FROM "userBusiness" AS ub
    JOIN "user" AS u ON u.id = ub.user_id
    WHERE ub.user_id = $3 AND ub.business_id = $4 AND p.id = ub.permission_id
    RETURNING u.id, u.email, u.account_type, p.role; 
  `;
    const result = await db.query(updatePermissionQuery, [
      role,
      description,
      userId,
      businessId,
    ]);

    if (result.rows.length > 0) {
      return { success: true, user: result.rows[0] };
    } else {
      return { success: false, message: "User or permission not found" };
    }
  } catch (error) {
    console.error("Error updating user permission:", error);
    throw error;
  }
};

module.exports = {
  createPermissionQuery,
  updatePermissionQuery,
};
