const express = require("express");
const router = express.Router();

const {
  getArticles,
  getArticleById,
  getArticleDetails,
} = require("../controllers/articleControllers");

router.get("/", getArticles);
router.get("/details", getArticleDetails);
router.get("/:id", getArticleById);

module.exports = router;
