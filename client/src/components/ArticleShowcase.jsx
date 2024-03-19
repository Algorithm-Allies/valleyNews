const article = {
  source:
    "https://www.turlockjournal.com/sports/community/demand-high-ski-equipment-snowy-winter/",
  publisher: "Turlock Journal",
  headline: "Demand high for ski equipment with snowy winter",
  subHeading: null,
  category: "SPORTS",
  subcategory: "LOCAL SPORTS",
  author: "Pawan Naidu",
  date_published: null,
  image_url:
    "https://centralca.cdn-anvilcms.net/media/images/2022/01/05/images/Skiing.max-752x423.jpg",
  image_alt_description: "Bear Valley ski",
  thumbnail_url:
    "https://centralca.cdn-anvilcms.net/media/images/2022/01/05/images/Skiing.4e32b089.fill-300x200.jpg",
  thumbnail_alt_description: "Bear Valley ski",
  paragraphs: [
    "Turlock ski shop Sun Sports is seeing a booming business this season already after above-average precipitation in the past month has turned into premium powder on the slopes. Many local skiers and snowboarders are eager to hit the slopes after California is seeing much more snow than the past few years.",
    "“Business is cracking, people are coming in to get all their gear,” said Sun Sports owner Denis Sondeno. “It’s funny how many people show up when it snows a lot.”",
    "Sondeno sends a lot of his visitors to Dodge Ridge in Pinecrest, where they saw over half of 2020’s amount of snow in the last month alone. Last month the resort received 109 inches of snow in seven days compared to 206 inches in 26 days in the 2020-2021 season. The 2021-2022 season should be one of the heaviest snow seasons in the last 10 years, according to a snow report.",
    "Dodge Ridge reported getting nearly 15 feet of snow in the month of December, making for some of the best ski conditions in recent memory with low temperatures at the summit keeping all the new snowfall in great condition.",
    "Other local ski resorts include Bear Valley, located off Highway 4 in the Stanislaus Forest, and Kirkwood, located south of South Lake Tahoe in the 209.",
    "With the great ski weather, also comes icy road conditions, however. All the local resorts recommend visitors check daily conditions before traveling, as tire chains are often required.",
    "Before hitting the slopes, make sure to get the proper clothing and beginners should consider taking lessons to have the most enjoyable experience, said Sondeno.",
    "“I recommend people take lessons every time because if you’re new you need lessons, even though everyone thinks they know what’s going on when they watch YouTube,” he said. “You need to dress correctly, which not too many people do. You need good pants and good gloves, and you could probably use a jacket. Skiing is something where if you get the right stuff your day is so much better.”",
    "Sun Sports is trying to keep with demand after they received late shipments. There were multiple items that were supposed to arrive in September that are just arriving now. That hasn’t stopped the shop from meeting all their customers' needs and they're ready to keep going this pace for the rest of ski season.",
    "People can visit Sun Sports in Turlock at 191 S. Golden State Blvd. and call (209) 634-2073 for any questions.",
  ],
};

const DUMMY_ARTICLES = new Array(5).fill(article);

export default function ArticleShowcase({ articles }) {
  const [articleIndex, setArticleIndex] = React.useState(0);
  const activeArticle = articles[articleIndex];

  return (
    <div>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="grid">
            <img
              className="object-cover w-full h-full"
              src={activeArticle.image_url}
              alt={activeArticle.image_alt_description}
            />
          </div>
        </div>
        <div className="w-60 border-2 border-red-500">
          <h2>Latest News</h2>
        </div>
      </div>
    </div>
  );
}
