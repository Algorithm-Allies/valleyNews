const { json } = require("express");
const db = require("../config/database");
const { insertArticle } = require("../services/articleService");

// POST /api/articles
async function createNewArticles(req, res) {
  try {
    await createArticles(articles);
    res.status(201).json({ message: "Articles created successfully" });
  } catch (error) {
    console.error("Error creating articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Create articles -- bulk insert into database
async function createArticles(req, res) {
  const articlesData = await req.body;
  try {
    const insertedIds = [];
    for (const article of articlesData) {
      const insertedId = await insertArticle(article);
      insertedIds.push(insertedId);
    }
    console.log(`Inserted ${insertedIds.length} articles`);
    res.status(201).json({ message: "Articles created successfully" });
  } catch (error) {
    console.error("Error inserting articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/articles
// Get all articles
async function getArticles(req, res) {
  const query = `
    SELECT * FROM article
    ORDER BY date_published DESC
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
    ORDER BY date_published DESC
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
  let subcategory;

  switch (req.params.subcategory.toLowerCase()) {
    case "local":
      subcategory = category === "NEWS" ? "LOCAL NEWS" : "LOCAL SPORTS";
      break;
    case "high-school":
      subcategory = "HIGH SCHOOL SPORTS";
      break;
    case "crime":
    case "government":
    case "education":
      subcategory = req.params.subcategory.toUpperCase();
      break;
    default:
      return res.status(400).json({ error: "Invalid subcategory" });
  }

  const query = `
    SELECT * FROM article
    WHERE category = $1
    AND subcategory = $2
    ORDER BY date_published DESC
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
  getArticles,
  getArticlesByCategory,
  getArticlesBySubcategory,
  getArticleById,
  getArticleDetails,
  getArticleUrls,
};
