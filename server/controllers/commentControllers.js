const {
  findCommentById,
  findArticleById,
  findCommentsByArticleId,
  addCommentIntoArticle,
  editCommentByID,
  deleteCommentByID,
} = require("../services/commentService");
//view a comment by id
const viewCommentById = async (req, res) => {
  const commentId = req.params.comment_id;

  try {
    const comment = await findCommentById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    console.error("Error retrieving comment by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//view comments in a article
const viewCommentsInArticle = async (req, res) => {
  const articleId = req.params.article_id;

  try {
    const article = await findArticleById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    const comments = await findCommentsByArticleId(articleId);

    res.json(comments);
  } catch (error) {
    console.error("Error retrieving comments in article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//add comment to article
const addComment = async (req, res) => {
  const articleId = req.params.article_id;
  const userId = req.params.user_id;
  const commentData = req.body;
  const timestamp = new Date();

  try {
    const article = await findArticleById(articleId);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const comment = {
      article_id: articleId,
      user_id: userId,
      comment: commentData.comment,
      timestamp: timestamp,
    };

    const addingComment = await addCommentIntoArticle(comment);

    res.json(addingComment);
  } catch (error) {
    console.error("Error adding comment into article:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//edit comment
const editComment = async (req, res) => {
  const comment_id = req.params.comment_id;
  const updatedCommentData = req.body;

  try {
    const existingComment = await findCommentById(comment_id);
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    const editedComment = await editCommentByID(
      comment_id,
      updatedCommentData.comment
    );

    res.json(editedComment);
  } catch (error) {
    console.error("Error editing comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteComment = async (req, res) => {
  const comment_id = req.params.comment_id;

  try {
    const existingComment = await findCommentById(comment_id);
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await deleteCommentByID(comment_id);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  viewCommentById,
  viewCommentsInArticle,
  addComment,
  editComment,
  deleteComment,
};
