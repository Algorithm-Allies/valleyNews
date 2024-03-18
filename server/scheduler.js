const { scrapeData } = require("./scrapeData");
const { createArticles } = require("./controllers/articleControllers");

async function scrapeAndCreateArticles() {
  try {
    // Scrape data
    await scrapeData("turlock");

    // Read data from JSON file
    const articles = require("./articles.json");

    await createArticles(articles);
  } catch (error) {
    console.error("Error while scraping data:", error);
  }
}

//scrapeAndCreateArticles();

module.exports = { scrapeAndCreateArticles };
