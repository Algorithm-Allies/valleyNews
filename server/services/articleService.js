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

async function getArticleByIdQuery(articleId) {
  const query = `
    SELECT * FROM article WHERE id = $1
  `;
  try {
    const { rows } = await db.query(query, [articleId]);
    return rows[0];
  } catch (error) {
    console.error("Error getting article by ID:", error);
    throw error;
  }
}

async function editArticleQuery(articleId, updatedArticle) {
  const query = `
    UPDATE article 
    SET 
      source = $1,
      publisher = $2,
      headline = $3,
      subheading = $4,
      category = $5,
      subcategory = $6,
      author = $7,
      date_published = $8,
      image_url = $9,
      image_alt_description = $10,
      thumbnail_url = $11,
      thumbnail_alt_description = $12,
      paragraphs = $13,
      business_id = $14
    WHERE id = $15
    RETURNING id
  `;
  const values = [
    updatedArticle.source,
    updatedArticle.publisher,
    updatedArticle.heading,
    updatedArticle.subHeading,
    updatedArticle.category,
    updatedArticle.subcategory,
    updatedArticle.author,
    updatedArticle.date,
    updatedArticle.img.src,
    updatedArticle.img.alt,
    updatedArticle.thumbnail.src,
    updatedArticle.thumbnail.alt,
    updatedArticle.paragraphs,
    updatedArticle.business_id,
    articleId,
  ];
  console.log(values);
  try {
    const { rows } = await db.query(query, values);
    return rows[0].id;
  } catch (error) {
    console.error("Error editing article:", error);
    throw error;
  }
}

module.exports = {
  insertArticle,
  getArticleByIdQuery,
  editArticleQuery,
};
