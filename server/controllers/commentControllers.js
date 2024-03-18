const db = require("../config/database");
const { findCommentById } = require("../services/commentService");
//view a comment by id
const viewCommentById = async (req, res) => {
  const commentId = req.params.comment_id;

  try {
    // Query the database to find the comment by ID
    const comment = await findCommentById(commentId);

    if (!comment) {
      // If comment does not exist, return a 404 status code with a message
      return res.status(404).json({ message: "Comment not found" });
    }

    // If comment exists, return it as a response
    res.json(comment);
  } catch (error) {
    // If an error occurs during the database query, return a 500 status code with an error message
    console.error("Error retrieving comment by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//view comments in a article
const viewCommentsInArticle = async (req, res) => {
  const articleId = req.params.article_id;

  try {
    // Query the database to check if the article exists
    const article = await findArticleById(articleId);

    if (!article) {
      // If the article does not exist, return a 404 status code with a message
      return res.status(404).json({ message: "Article not found" });
    }

    // If the article exists, query the database to retrieve comments associated with the article
    const comments = await findCommentsByArticleId(articleId);

    // Return the comments as a response
    res.json(comments);
  } catch (error) {
    // If an error occurs during the database query, return a 500 status code with an error message
    console.error("Error retrieving comments in article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//add comment to article
const addComment = async (req, res) => {};
//edit comment
const editComment = async (req, res) => {};
//delete comment
const deleteComment = async (req, res) => {};

module.exports = {
  viewCommentById,
  viewCommentsInArticle,
  addComment,
  editComment,
  deleteComment,
};
