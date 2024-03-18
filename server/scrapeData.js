//// IMPORTS ////
const { writeFile } = require("fs/promises");
const path = require("path");
// Getting Scraper functions.
const { turlockJournalScraper } = require("./scrapers/turlockScraper");

//// FUNCTIONS ////

async function scrapeData(city = "all") {
  console.log("\n");
  let articles = [];
  articles = await turlockJournalScraper();
  console.log(`Scraped ${articles.length} articles from The Turlock Journal`);
  await writeFile(
    path.join(process.cwd(), "articles.json"),
    JSON.stringify(articles)
  );
}

// Updates Scraped Data object and will write to JSON file.
//scrapeData("turlock");

module.exports = { scrapeData };
