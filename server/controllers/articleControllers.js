const db = require("../config/database");
const { insertArticle } = require("../services/articleService");

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

module.exports = {
  createArticles,
  getArticles,
  getArticleById,
  getArticleDetails,
};
