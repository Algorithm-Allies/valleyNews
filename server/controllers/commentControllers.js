const db = require("../config/database");
const {
  findCommentById,
  findArticleById,
  findCommentsByArticleId,
  addCommentIntoArticle,
} = require("../services/commentService");
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
const addComment = async (req, res) => {
  const articleId = req.params.article_id;
  const commentData = req.body;
  const userId = req.user.id; // Assuming the user ID is available in the request object
  const timestamp = new Date(); // Assuming you want to use the current timestamp

  try {
    // Query the database to check if the article exists
    const article = await findArticleById(articleId);

    if (!article) {
      // If the article does not exist, return a 404 status code with a message
      return res.status(404).json({ message: "Article not found" });
    }

    const comment = {
      article_id: articleId,
      user_id: userId, // Assign the user ID obtained from the request
      comment: commentData.comment,
      timestamp: timestamp, // Assign the current timestamp
    };

    const addingComment = await addCommentIntoArticle(comment);

    res.json(addingComment);
  } catch (error) {
    // If an error occurs during the database query, return a 500 status code with an error message
    console.error("Error adding comment into article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//edit comment
const editComment = async (req, res) => {
  const comment_id = req.params.comment_id;
};
//delete comment
const deleteComment = async (req, res) => {
  const comment_id = req.params.comment_id;
};

module.exports = {
  viewCommentById,
  viewCommentsInArticle,
  addComment,
  editComment,
  deleteComment,
};
