const db = require("../config/database");

async function findCommentById(comment_id) {
  try {
    // Query to retrieve the comment by its ID
    const query = `
      SELECT *
      FROM comments
      WHERE id = $1
    `;

    // Execute the query with the comment_id as a parameter
    const { rows } = await db.query(query, [comment_id]);

    // Return the comment if found, or null if not found
    return rows.length ? rows[0] : null;
  } catch (error) {
    // Handle errors if the query fails
    console.error("Error retrieving comment by ID:", error);
    throw error;
  }
}

async function findArticleById(article_id) {
  try {
    const query = `
        SELECT *
        FROM article
        WHERE id = $1
      `;
    const article = await db.oneOrNone(query, [article_id]);
    return article;
  } catch (error) {
    console.error("Error finding article by ID:", error);
    throw error;
  }
}

async function findCommentsByArticleId(article_id) {
  try {
    const query = `
        SELECT *
        FROM comments
        WHERE article_id = $1
      `;
    const comments = await db.manyOrNone(query, [article_id]);
    return comments;
  } catch (error) {
    console.error("Error finding comments by article ID:", error);
    throw error;
  }
}

module.exports = {
  findCommentById,
  findArticleById,
  findCommentsByArticleId,
};