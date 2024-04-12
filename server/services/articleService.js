const db = require("../config/database");

async function insertArticle(article) {
  const query = `
    INSERT INTO article (source, publisher, headline, subheading, category, subcategory, author, date_published, date_time_published, image_url, image_alt_description,
    thumbnail_url, thumbnail_alt_description,
    paragraphs, business_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING id
  `;
  const values = [
    article.source,
    article.publisher,
    article.heading,
    article.subHeading,
    article.category,
    article.subcategory,
    article.author,
    article.date,
    article.datetime,
    article.img.src,
    article.img.alt,
    article.thumbnail.src,
    article.thumbnail.alt,
    article.paragraphs,
    article.business_id,
  ];

  try {
    const { rows } = await db.query(query, values);
    return rows[0].id;
  } catch (error) {
    console.error("Error inserting article:", error);
    console.log("Article with error", article);
    throw error;
  }
}

module.exports = {
  insertArticle,
};
