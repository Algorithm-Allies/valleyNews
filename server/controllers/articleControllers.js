const db = require("../config/database");
const { insertArticle } = require("../services/articleService");

// Create articles -- bulk insert into database
async function createArticles(req, res) {
  try {
    const articlesData = req.body;
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
  const { page, perPage } = req.query;
  const offset = (page - 1) * perPage;
  const limit = perPage;
  const query = `
    SELECT * FROM article
    ORDER BY date_time_published DESC
    LIMIT $1 OFFSET $2
  `;

  try {
    const { rows } = await db.query(query, [limit, offset]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error getting articles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//GET api/article/:category
//Get articles by category
async function getArticlesByCategory(req, res) {
  const category = req.params.category.toUpperCase();
  const { page = 1, perPage = 20 } = req.query;
  const offset = (page - 1) * perPage;

  const countQuery = `
  SELECT COUNT(*) AS total FROM article
  WHERE category = $1
`;

  const articlesQuery = `
  SELECT * FROM (
    SELECT * FROM article
    WHERE category = $1
    ORDER BY date_time_published DESC
  ) AS ordered_articles
  LIMIT $2 OFFSET $3
  `;

  try {
    // Get total number of articles for this category
    const countResult = await db.query(countQuery, [category]);
    const totalArticles = countResult.rows[0].total;

    // Calculate total number of pages
    const totalPages = Math.ceil(totalArticles / perPage);

    // Get articles for this category
    const articlesResult = await db.query(articlesQuery, [
      category,
      perPage,
      offset,
    ]);

    if (articlesResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No articles found for this category" });
    }
    res.status(200).json({ totalPages, articles: articlesResult.rows });
  } catch (error) {
    console.error("Error getting articles by category:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/articles/:category/:subcategory
// Get articles by category and subcategory
async function getArticlesBySubcategory(req, res) {
  const category = req.params.category.toUpperCase();
  const { page = 1, perPage = 20 } = req.query;
  const offset = (page - 1) * perPage;
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

  const countQuery = `
  SELECT COUNT(*) AS total FROM article
    WHERE category = $1
    AND subcategory = $2
  `;

  const articlesQuery = `
  SELECT * FROM (
    SELECT * FROM article
    WHERE category = $1
    AND subcategory = $2
    ORDER BY date_time_published DESC
  ) AS ordered_articles
  LIMIT $3 OFFSET $4
  `;

  try {
    // Get total number of articles for this subcategory
    const countResult = await db.query(countQuery, [category, subcategory]);
    const totalArticles = countResult.rows[0].total;

    //Calculate total number of pages
    const totalPages = Math.ceil(totalArticles / perPage);

    // Get articles for this subcategory
    const articlesResult = await db.query(articlesQuery, [
      category,
      subcategory,
      perPage,
      offset,
    ]);

    if (articlesResult.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No articles found for this subcategory" });
    }
    res.status(200).json({ totalPages, articles: articlesResult.rows });
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

  try {
    // Update click count
    const updateQuery = `
      UPDATE article
      SET click_count = click_count + 1
      WHERE id = $1;
    `;
    await db.query(updateQuery, [articleId]);

    // Get article by ID
    const selectQuery = `
      SELECT * FROM article
      WHERE id = $1
    `;
    const { rows } = await db.query(selectQuery, [articleId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Send article data with updated click count
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(
      "Error fetching article by ID and updating click count:",
      error.message
    );
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

async function articleClicked(req, res) {
  const { articleId } = req.params;

  try {
    const query = `
      UPDATE article
      SET click_count = click_count + 1
      WHERE id = $1;
    `;
    await db.query(query, [articleId]);

    res
      .status(200)
      .json({ message: "Article click count updated successfully" });
  } catch (error) {
    console.error("Error updating article click count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getArticleClickCount(req, res) {
  const articleId = req.params.id;

  try {
    const query = `
      SELECT click_count FROM article
      WHERE id = $1
    `;

    const { rows } = await db.query(query, [articleId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Article not found" });
    }

    const clickCount = rows[0].click_count;

    res.status(200).json({ click_count: clickCount });
  } catch (error) {
    console.error("Error fetching article click count:", error.message);
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
  articleClicked,
  getArticleClickCount,
};
