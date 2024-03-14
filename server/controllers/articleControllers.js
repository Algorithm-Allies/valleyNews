const db = require("../config/database");
const { insertArticle } = require("../services/articleService");

// POST /api/articles
// Create articles -- bulk insert into database
async function createArticles(req, res) {
  const articlesData = req.body;
  try {
    const insertedIds = [];
    for (const article of articlesData) {
      const insertedId = await insertArticle(article);
      insertedIds.push(insertedId);
    }
    res
      .status(201)
      .json({ ids: insertedIds, message: "Articles inserted successfully" });
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

module.exports = {
  createArticles,
  getArticles,
  getArticleById,
};
