const db = require("../config/database");

const findCommentById = async (comment_id) => {
  try {
    const query = `
      SELECT c.*, u.id as user_id, u.email, u.account_type
    FROM comment c
    JOIN "user" u ON c.user_id = u.id
    WHERE c.id = $1
      `;

    const result = await db.query(query, [comment_id]);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving comment by ID:", error);
    throw error;
  }
};

const findArticleById = async (article_id) => {
  try {
    const query = `
          SELECT *
          FROM article
          WHERE id = $1
        `;
    const result = await db.query(query, [article_id]);
    return result.rows[0]; // Return the first row or null if no rows found
  } catch (error) {
    console.error("Error finding article by ID:", error);
    throw error;
  }
};

const findCommentsByArticleId = async (article_id) => {
  try {
    const query = `
    SELECT c.*, u.id as user_id, u.email, u.account_type
    FROM comment c
    JOIN "user" u ON c.user_id = u.id
    WHERE c.article_id = $1
  `;
    const comments = await db.query(query, [article_id]);
    return comments.rows;
  } catch (error) {
    console.error("Error finding comments by article ID:", error);
    throw error;
  }
};

const addCommentIntoArticle = async (commentData) => {
  try {
    const query = `
        INSERT INTO comment ("article_id", "user_id", "comment", "created_at")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

    const { article_id, user_id, comment, timestamp } = commentData;

    const addedComment = await db.query(query, [
      article_id,
      user_id,
      comment,
      timestamp,
    ]);
    const result = await findCommentById(addedComment.rows[0].id);
    return result;
  } catch (error) {
    console.error("Error adding comment into article:", error);
    throw error;
  }
};

const editCommentByID = async (comment_id, comment) => {
  try {
    const query = `
        UPDATE comment
        SET 
          comment = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
      `;

    const editedComment = await db.query(query, [comment, comment_id]);
    const result = await findCommentById(comment_id);
    return result;
  } catch (error) {
    console.error("Error editing comment:", error);
    throw error;
  }
};

const deleteCommentByID = async (comment_id) => {
  try {
    const query = `
        DELETE FROM comment
        WHERE id = $1;
      `;

    await db.query(query, [comment_id]);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
module.exports = {
  findCommentById,
  findArticleById,
  findCommentsByArticleId,
  addCommentIntoArticle,
  editCommentByID,
  deleteCommentByID,
};
