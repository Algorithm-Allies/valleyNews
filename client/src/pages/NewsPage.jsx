import { useEffect, useState } from "react";
import ArticleThumbnail from "../components/ArticleThumbnail";
import LatestArticle from "../components/LatestArticle";
import { useParams, Link } from "react-router-dom";

import {
  getArticlesByCategoryAndSubcategory,
  getArticlesByCategory,
} from "../services/articleService";

//page for different news categories based on selected category i.e local, sports, crime, government, education, etc
function NewsPage() {
  const { category, subcategory } = useParams();
  const [loading, setLoading] = useState(true);
  const [latestArticles, setLatestArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let res;
        if (subcategory) {
          res = await getArticlesByCategoryAndSubcategory({
            category,
            subcategory,
          });
        } else {
          res = await getArticlesByCategory({ category });
        }
        if (res.ok) {
          setArticles(res.data);
          setLatestArticles(res.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category, subcategory]);

  if (loading) {
    return (
      <div className="text-xl text-custom-orange flex justify-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col items-center w-full">
      <div className="text-2xl leading-6 font-bold text-custom-orange m-4 ">
        <nav className="mb-4">
          <ul className="flex justify-center">
            <li className="mr-4">
              <Link to="/news">NEWS</Link>
            </li>
            <li>
              <Link to="/sports">SPORTS</Link>
            </li>
          </ul>
        </nav>

        {category === "news" ? (
          <nav className="mb-4">
            <ul className="flex">
              <li className="mr-4">
                <Link to="/news/government">Government</Link>
              </li>
              <li className="mr-4">
                <Link to="/news/education">Education</Link>
              </li>
              <li>
                <Link to="/news/crime">Crime</Link>
              </li>
            </ul>
          </nav>
        ) : (
          category === "sports" && (
            <nav className="mb-4">
              <ul className="flex">
                <li className="mr-4">
                  <Link to="/sports/high-school">High School</Link>
                </li>
                <li>
                  <Link to="/sports/local">Local</Link>
                </li>
              </ul>
            </nav>
          )
        )}
      </div>
      <LatestArticle articles={latestArticles} />
      <div className=" text-2xl leading-6 text-center text-custom-orange  m-4 items-stretch">
        {subcategory ? subcategory.toUpperCase() : null}
      </div>
      <div
        className="unset-border-box  shadow-gray-700 shadow-md bg-brown-400 
    p-8 rounded-lg grid xl:grid-cols-4 
    lg:grid-cols-3 md:grid-cols-2 sm:grid-col-1 
    md:gap-x-8 gap-4 md:w-[80vw] auto-rows-max"
      >
        {articles.map((article) => (
          <ArticleThumbnail
            category={category}
            subcategory={subcategory}
            key={article.id}
            id={article.id}
            article={article}
          />
        ))}
      </div>
    </div>
  );
}

export default NewsPage;
