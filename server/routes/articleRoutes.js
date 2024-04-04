const express = require("express");
const router = express.Router();

const {
  getArticles,
  getArticleById,
  getArticleDetails,
  getArticlesByCategory,
  getArticlesBySubcategory,
  getArticleUrls,
  createArticles,
  createNewArticles,
} = require("../controllers/articleControllers");

router.post("/", createArticles);
router.get("/", getArticles);
//router.get("/id/:id", getArticleById);
router.get("/urls", getArticleUrls);
router.get("/details", getArticleDetails);
router.get("/:category", getArticlesByCategory);
router.get("/:category/:subcategory", getArticlesBySubcategory);
router.get("/:category/:subcategory/:id", getArticleById);

module.exports = router;
