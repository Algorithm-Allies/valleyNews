const { json } = require("express");
const db = require("../config/database");
const { insertArticle } = require("../services/articleService");

// POST /api/articles
async function createNewArticles(req, res) {
  articles = json.parse(req.body);
  try {
    await createArticles(articles);
    res.status(201).json({ message: "Articles created successfully" });
  } catch (error) {
    console.error("Error creating articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Create articles -- bulk insert into database
async function createArticles(articlesData) {
  try {
    const insertedIds = [];
    for (const article of articlesData) {
      const insertedId = await insertArticle(article);
      insertedIds.push(insertedId);
    }
    console.log(`Inserted ${insertedIds.length} articles`);
  } catch (error) {
    console.error("Error inserting articles:", error);
    throw error;
  }
}

// GET /api/articles
// Get all articles
async function getArticles(req, res) {
  const query = `
    SELECT * FROM article
  `;

  try {
    const { rows } = await db.query(query);
    res.status(200).json(rows); // Send the retrieved articles as JSON response
  } catch (error) {
    console.error("Error getting articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//GET api/article/:category
//Get articles by category
async function getArticlesByCategory(req, res) {
  const category = req.params.category.toUpperCase();

  const query = `
    SELECT * FROM article
    WHERE category = $1
  `;

  try {
    const { rows } = await db.query(query, [category]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No articles found for this category" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting articles by category:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/articles/:category/:subcategory
// Get articles by category and subcategory
async function getArticlesBySubcategory(req, res) {
  const category = req.params.category.toUpperCase();
  const subcategory = req.params.subcategory.toUpperCase();

  const query = `
    SELECT * FROM article
    WHERE category = $1
    AND subcategory = $2
  `;

  try {
    const { rows } = await db.query(query, [category, subcategory]);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No articles found for this subcategory" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error(
      "Error getting articles for this subcategory:",
      error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/articles/:id
// Get article by ID
async function getArticleById(req, res) {
  const articleId = req.params.id;

  const query = `
    SELECT * FROM article
    WHERE id = $1
  `;

  try {
    const { rows } = await db.query(query, [articleId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error fetching article by ID:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/articles/details
// Get basic article details
async function getArticleDetails(req, res) {
  const query = `
    SELECT id, source, headline, publisher, author, date_published FROM article
  `;

  try {
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/articles/urls
// Get all article URLs
async function getArticleUrls(req, res) {
  const query = `
    SELECT id, source FROM article
  `;

  try {
    const { rows } = await db.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting article URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createArticles,
  createNewArticles,
  getArticles,
  getArticlesByCategory,
  getArticlesBySubcategory,
  getArticleById,
  getArticleDetails,
  getArticleUrls,
};
