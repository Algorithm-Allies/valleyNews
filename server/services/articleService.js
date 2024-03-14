const db = require("../config/database");

async function insertArticle(article) {
  const query = `
    INSERT INTO article (source, publisher, headline, subheading, category, subcategory, author, date_published, image_url, image_alt_description, paragraphs)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING id
  `;

  const values = [
    article.source,
    article.publisher,
    article.headline,
    article.subheading,
    article.category,
    article.subcategory,
    article.author,
    article.date_published,
    article.image.src,
    article.image.alt,
    article.paragraphs,
  ];

  try {
    const { rows } = await db.query(query, values);
    console.log(`Inserted article with ID: ${rows[0].id}`);
    return rows[0].id;
  } catch (error) {
    console.error("Error inserting article:", error);
    throw error; // Propagate the error to the caller
  }
}

module.exports = {
  insertArticle,
};
