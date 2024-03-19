const db = require("../config/database");

async function findCommentById(comment_id) {
  try {
    const query = `
      SELECT *
      FROM comments
      WHERE id = $1
    `;
    const { rows } = await db.query(query, [comment_id]);

    return rows.length ? rows[0] : null;
  } catch (error) {
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

async function addCommentIntoArticle(comment) {
  try {
    const query = `
        INSERT INTO comment (article_id, user_id, comment, created_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;

    const { article_id, user_id, comment, created_at } = comment;

    const addedComment = await db.one(query, [
      article_id,
      user_id,
      comment,
      created_at,
    ]);

    return addedComment;
  } catch (error) {
    console.error("Error adding comment into article:", error);
    throw error;
  }
}

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

    const { edited_comment } = comment;

    const editedComment = await db.one(query, [edited_comment, comment_id]);
    return editedComment;
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

    await db.none(query, [comment_id]);
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
