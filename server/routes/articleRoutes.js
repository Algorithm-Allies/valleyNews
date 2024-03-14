const express = require("express");
const router = express.Router();

const {
  createArticles,
  getArticles,
  getArticleById,
} = require("../controllers/articleControllers");

router.post("/", createArticles);
router.get("/", getArticles);
router.get("/:id", getArticleById);

module.exports = router;
