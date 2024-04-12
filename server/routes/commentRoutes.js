const express = require("express");
const router = express.Router();

const {
  viewCommentById,
  viewCommentsInArticle,
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/commentControllers");

router.get("/:comment_id", viewCommentById);
router.get("/article/:article_id", viewCommentsInArticle);
router.post("/:article_id/:user_id", addComment);
router.put("/:comment_id", editComment);
router.delete("/:comment_id", deleteComment);

module.exports = router;
